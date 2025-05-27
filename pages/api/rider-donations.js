import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Donation from '../../models/Donation'
import RiderPickup from '../../models/RiderPickup'

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

    const donations = await Donation.find({
      _id: { $in: donationIds }
    }).lean()

    const donorUserIds = [...new Set(donations.map(d => d.userId.toString()))]

    const donors = await User.find({ _id: { $in: donorUserIds } }, { email: 1, phone: 1 }).lean()

    const donorMap = {}
    donors.forEach(d => {
      donorMap[d._id.toString()] = { email: d.email, phone: d.phone }
    })

    const donationsWithDonor = donations.map(donation => ({
      ...donation,
      userEmail: donorMap[donation.userId.toString()]?.email || '',
      userPhone: donorMap[donation.userId.toString()]?.phone || ''
    }))

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
