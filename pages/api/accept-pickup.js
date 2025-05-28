import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Donation from '../../models/Donation'
import PickedUp from '../../models/PickedUp'
import { sendPickupNotificationEmails } from '../../lib/sendEmail'  // Use the right email function

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }

  const riderId = decoded.userId

  // Verify user role (rider or admin)
  const user = await User.findById(riderId).lean()
  if (!user || !['rider', 'admin'].includes(user.role.toLowerCase())) {
    return res.status(403).json({ message: 'Access denied: Only riders or admins can accept pickups' })
  }

  const { donationId, collectedBy } = req.body

  if (!donationId || !collectedBy) {
    return res.status(400).json({ message: 'Missing donationId or collectedBy' })
  }

  try {
    const donation = await Donation.findById(donationId).lean()
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' })
    }

    if (donation.status_pickup === 'pickedup') {
      return res.status(400).json({ message: 'Donation already picked up' })
    }

    const existing = await PickedUp.findOne({ donationId })
    if (existing) {
      return res.status(400).json({ message: 'Pickup already recorded' })
    }

    // Record the pickup
    await PickedUp.create({
      donationId,
      collectedBy,
      riderId,
      pickedUpAt: new Date()
    })

    // Update donation status to picked up
    await Donation.findByIdAndUpdate(donationId, { status_pickup: 'pickedup' })

    // Get donor, requester (receiver), and rider info
    const donor = await User.findById(donation.userId).lean()
    const requester = await User.findById(collectedBy).lean()
    const rider = user

    // Send emails notifying donor and requester about pickup
    if (donor && requester && rider) {
      await sendPickupNotificationEmails(donor, requester, rider, donation)
    }

    return res.status(200).json({ message: 'Pickup accepted successfully and emails sent' })
  } catch (error) {
    console.error('Error accepting pickup:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
