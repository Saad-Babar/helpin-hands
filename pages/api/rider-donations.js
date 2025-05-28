import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Donation from '../../models/Donation'
import RiderPickup from '../../models/RiderPickup'
import Collected from '../../models/Collected'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await connectToDB()

  const cookies = cookie.parse(req.headers.cookie || '')
  const token = cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' })
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }

  try {
    const user = await User.findById(decoded.userId).lean()
    if (!user) return res.status(404).json({ message: 'User not found' })

    if (!['admin', 'rider'].includes(user.role.toLowerCase())) {
      return res.status(403).json({ message: 'Access denied. Only Admins or Riders allowed' })
    }

    const pickups = await RiderPickup.find().lean()
    const donationIds = pickups.map(p => p.donationId)

    if (donationIds.length === 0) {
      return res.status(200).json({ donations: [], message: 'No donations assigned' })
    }

    let donations = await Donation.find({
      _id: { $in: donationIds },
      status_pickup: { $ne: 'pickedup' }
    }).lean()

    if (user.role.toLowerCase() === 'rider') {
      donations = donations.filter(d => d.location?.city?.toLowerCase() === user.city?.toLowerCase())
    }

    const donorUserIds = [...new Set(donations.map(d => d.userId.toString()))]

    const donors = await User.find({ _id: { $in: donorUserIds } }, { email: 1, phone: 1 }).lean()

    const donorMap = {}
    donors.forEach(d => {
      donorMap[d._id.toString()] = { email: d.email, phone: d.phone }
    })

    const collectedDocs = await Collected.find({ donationId: { $in: donations.map(d => d._id.toString()) } }).lean()

    const collectedMap = {}
    const collectedByUserIds = []

    collectedDocs.forEach(doc => {
      collectedMap[doc.donationId.toString()] = doc.collectedBy.toString()
      collectedByUserIds.push(doc.collectedBy.toString())
    })

    const dropOffUsers = await User.find(
      { _id: { $in: collectedByUserIds } },
      { name: 1, email: 1, phone: 1, address: 1 }
    ).lean()

    const dropOffUserMap = {}
    dropOffUsers.forEach(u => {
      dropOffUserMap[u._id.toString()] = {
        collectedBy: u._id.toString(), // ✅ Added for frontend
        name: u.name,
        email: u.email,
        phone: u.phone,
        address: u.address || 'N/A'
      }
    })

    const donationsWithDonor = donations.map(donation => {
      const donor = donorMap[donation.userId.toString()] || {}
      const collectedById = collectedMap[donation._id.toString()]
      const dropOff = collectedById ? dropOffUserMap[collectedById] : null

      return {
        ...donation,
        userEmail: donor.email || '',
        userPhone: donor.phone || '',
        dropOffInfo: dropOff
      }
    })

    return res.status(200).json({
      donations: donationsWithDonor,
      role: user.role,
      city: user.city || '',
    })
  } catch (error) {
    console.error('Error fetching rider donations:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
