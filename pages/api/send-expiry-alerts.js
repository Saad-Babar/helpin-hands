import { connectToDB } from '../../lib/mongodb'

// import DonationItem from '../../models/DonationItem'
import Expiry from '../../models/Expiry'

import User from '../../models/User'
import { sendExpiryEmail } from '../../lib/sendEmail'

export default async function handler(req, res) {
  try {
    await connectToDB()

    const now = new Date()
    const items = await Expiry.find({})

    for (const item of items) {
      const expiryDate = new Date(item.expiryDate)
      const remindBefore = parseInt(item.remindBefore || '0', 10)

      const remindDate = new Date(expiryDate)
      remindDate.setDate(remindDate.getDate() - remindBefore)

      // Compare only dates ignoring time
      const nowDate = new Date(now.toISOString().split('T')[0])
      const remindDateOnly = new Date(remindDate.toISOString().split('T')[0])

      if (nowDate.getTime() === remindDateOnly.getTime()) {
        const user = await User.findById(item.userId)
        if (user?.email) {
          await sendExpiryEmail(user.email, item.itemName, expiryDate)
        }
      }
    }

    res.status(200).json({ success: true, message: 'Reminder emails sent if any.' })
  } catch (error) {
    console.error('Email sending failed:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
