import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Donation from '../../models/Donation'
import RiderPickup from '../../models/RiderPickup'
import { sendRiderNotificationEmail } from '../../lib/sendEmail'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const { donationId } = req.body
  if (!donationId) {
    return res.status(400).json({ message: 'Donation ID is required' })
  }

  try {
    const requester = await User.findById(decoded.userId).lean()
    if (!requester) return res.status(404).json({ message: 'Requester not found' })

    const donation = await Donation.findById(donationId).lean()
    if (!donation) return res.status(404).json({ message: 'Donation not found' })

    const donor = await User.findById(donation.userId).lean()
    if (!donor) return res.status(404).json({ message: 'Donor not found' })

    const userCity = requester.city
    if (!userCity) {
      return res.status(400).json({ message: 'User city not found' })
    }

    // Check if this rider pickup request already exists
    const existingPickup = await RiderPickup.findOne({
      donationId: donationId,
      requesterId: decoded.userId,
    })

    if (existingPickup) {
      return res.status(400).json({
        message: 'You have already requested a rider for this donation. Please wait.',
      })
    }

    // Save new rider pickup request with riderCity (important for filtering donations later)
    await RiderPickup.create({
      donationId: donationId,
      requesterId: decoded.userId,
      riderCity: userCity.trim().toLowerCase(),  // normalize city casing here
    })

    // Find active riders in the user's city to notify
    const riders = await User.find({
      role: { $regex: new RegExp('^rider$', 'i') },
      city: new RegExp(`^${userCity}$`, 'i'),  // case-insensitive match
      status: 'Active',
    }).lean()

    if (riders.length === 0) {
      return res.status(404).json({ message: 'No riders found in your city' })
    }

    await sendRiderNotificationEmail(riders, donation, donor, requester, userCity)

    return res.status(200).json({ success: true, message: 'Riders notified successfully' })
  } catch (error) {
    console.error('Error requesting riders:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
