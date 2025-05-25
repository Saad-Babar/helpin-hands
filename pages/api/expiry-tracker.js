import { connectToDB } from '../../lib/mongodb'
import Expiry from '../../models/Expiry'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  await connectToDB()

  if (req.method === 'POST') {
    try {
      const token = req.cookies.token
      if (!token) return res.status(401).json({ success: false, message: 'Unauthorized: No token' })

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const userId = decoded.userId

      const { itemName, quantity, expiryDate, foodCategory, remindBefore } = req.body

      if (!itemName || !quantity || !expiryDate || !foodCategory || !remindBefore) {
        return res.status(400).json({ success: false, message: 'Missing required fields' })
      }

      const newItem = new Expiry({
        userId,
        itemName,
        quantity,
        expiryDate,
        foodCategory,
        remindBefore,
        status: 'ready to donate',
      })

      await newItem.save()

      res.status(201).json({ success: true, message: 'Item saved.' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: error.message })
    }
  } else if (req.method === 'GET') {
    try {
      const token = req.cookies.token
      if (!token) return res.status(401).json({ success: false, message: 'Unauthorized: No token' })

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const userId = decoded.userId

      const items = await Expiry.find({ userId }).sort({ createdAt: -1 })

      res.status(200).json({ success: true, data: items })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
