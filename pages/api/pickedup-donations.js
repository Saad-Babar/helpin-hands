import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import Pickedup from '../../models/PickedUp'
import Donation from '../../models/Donation'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await connectToDB()

  const cookies = cookie.parse(req.headers.cookie || '')
  const token = cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const riderId = decoded.userId

  try {
    const pickups = await Pickedup.find({ riderId }).lean()
    if (!pickups.length) {
      return res.status(200).json({ success: true, data: [] })
    }

    const donationIds = pickups.map(p => p.donationId)

    const donations = await Donation.find({
      _id: { $in: donationIds },
      status_pickup: 'pickedup',
    }).lean()

    const stripHtml = html => {
      if (!html || typeof html !== 'string') return 'N/A'
      return html.replace(/<\/?[^>]+(>|$)/g, '').trim() || 'N/A'
    }

    const data = donations.map(donation => {
      const pickup = pickups.find(p => p.donationId.toString() === donation._id.toString())

      const details = donation.details || {}
      const location = donation.location || {}

      return {
        id: donation._id.toString(),
        foodName: details.foodName || 'N/A',
        foodType: donation.foodType || 'N/A',
        mealSize: donation.mealSize || 'N/A',
        anyNote: stripHtml(details?.anyNote),
pickupAddress: location?.pickupAddress || 'N/A',
phoneNumber: location?.phoneNumber || 'N/A',

        city: location.city || 'N/A',
        deliveryOption: location.deliveryOptions || 'N/A',
        attachments: donation.attachments || [],
        status_pickup: donation.status_pickup,
        riderId,
        pickedUpAt: pickup?.pickedUpAt || null,
      }
    })

    return res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Error fetching picked up donations:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
