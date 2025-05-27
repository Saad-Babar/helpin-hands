// /pages/api/collected-donations.js

import { connectToDB } from '../../lib/mongodb'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import Collected from '../../models/Collected'
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
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const collectedDonations = await Collected.find({ collectedBy: decoded.userId })
      .populate('donationId') // pull full donation info
      .lean()

    // ✅ Filter only those donations where status is 'collected'
    const filtered = collectedDonations.filter(
      entry => entry.donationId && entry.donationId.status === 'collected'
    )

    const formatted = filtered.map(entry => ({
      id: entry.donationId._id.toString(), // <-- change here
      foodName: entry.donationId.details?.foodName || 'N/A',
      foodType: entry.donationId.foodType,
      city: entry.donationId.location?.city || 'N/A',
      collectedAt: new Date(entry.collectedAt).toLocaleString(),
      deliveryOption: entry.donationId.location?.deliveryOptions,
    }))

    return res.status(200).json({ success: true, data: formatted })
  } catch (error) {
    console.error('Error fetching collected donations:', error)
    return res.status(500).json({ message: 'Server error' })
  }
}
