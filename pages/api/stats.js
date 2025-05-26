import { connectToDB } from '../../lib/mongodb'
import Donation from '../../models/Donation'
import Expiry from '../../models/Expiry'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  try {
    await connectToDB()

    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.userId

    const totalDonations = await Donation.countDocuments({ userId })
    const totalExpiryItems = await Expiry.countDocuments({ userId })
    const readyToDonate = await Expiry.countDocuments({ userId, status: 'ready to donate' })
    const donated = await Expiry.countDocuments({ userId, status: 'donated' })

    console.log({
      userId,
      totalDonations,
      totalExpiryItems,
      readyToDonate,
      donated,
    })

    res.status(200).json({
      totalDonations,
      totalExpiryItems,
      readyToDonate,
      donated,
    })
  } catch (error) {
    console.error('Stats fetch failed:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
