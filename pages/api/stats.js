import { connectToDB } from '../../lib/mongodb'
import Donation from '../../models/Donation'
import Expiry from '../../models/Expiry'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  try {
    await connectToDB()

    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userIdString = decoded.userId

    // Convert userId string to ObjectId if valid, otherwise keep string
    const userId = mongoose.Types.ObjectId.isValid(userIdString)
      ? new mongoose.Types.ObjectId(userIdString)
      : userIdString

    console.log('userId for aggregation:', userId, typeof userId)

    const sevenDaysAgo = dayjs().subtract(6, 'day').startOf('day').toDate()

    // Count documents
    const totalDonations = await Donation.countDocuments({ userId })
    const totalExpiryItems = await Expiry.countDocuments({ userId })
    const readyToDonate = await Expiry.countDocuments({ userId, status: 'ready to donate' })
    const donated = await Expiry.countDocuments({ userId, status: 'donated' })

    // Aggregate daily donation counts last 7 days
    const donationHistoryAgg = await Donation.aggregate([
      { $match: { userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])

    // Aggregate daily expiry counts last 7 days
    const expiryHistoryAgg = await Expiry.aggregate([
      { $match: { userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])

    // Aggregate daily readyToDonate counts last 7 days
    const readyToDonateHistoryAgg = await Expiry.aggregate([
      { $match: { userId, status: 'ready to donate', createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])

    // Aggregate daily donated counts last 7 days
    const donatedHistoryAgg = await Expiry.aggregate([
      { $match: { userId, status: 'donated', createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])

    // Aggregate total points from donations
    const pointsAgg = await Donation.aggregate([
      { $match: { userId } },
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ])

    const pointsRedeemed = pointsAgg.length > 0 ? pointsAgg[0].totalPoints : 0

    // Aggregate daily points last 7 days
    const pointsHistoryAgg = await Donation.aggregate([
      { $match: { userId, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          totalPoints: { $sum: '$points' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ])

    // Helper: map aggregated results by date string
    const toMap = (arr) => {
      const map = {}
      arr.forEach(item => {
        const { year, month, day } = item._id
        const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        map[key] = item.count
      })
      return map
    }

    const donationMap = toMap(donationHistoryAgg)
    const expiryMap = toMap(expiryHistoryAgg)
    const readyMap = toMap(readyToDonateHistoryAgg)
    const donatedMap = toMap(donatedHistoryAgg)

    // Points map (different structure)
    const pointsMap = {}
    pointsHistoryAgg.forEach(item => {
      const { year, month, day } = item._id
      const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      pointsMap[key] = item.totalPoints
    })

    // Prepare last 7 days arrays
    const last7DaysDates = []
    const donationHistory = []
    const expiryHistory = []
    const readyToDonateHistory = []
    const donatedHistory = []
    const pointsHistory = []

    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day')
      const key = date.format('YYYY-MM-DD')
      last7DaysDates.push(date.format('MMM D'))
      donationHistory.push(donationMap[key] || 0)
      expiryHistory.push(expiryMap[key] || 0)
      readyToDonateHistory.push(readyMap[key] || 0)
      donatedHistory.push(donatedMap[key] || 0)
      pointsHistory.push(pointsMap[key] || 0)
    }

    const pendingPickups = 0 // Placeholder, update if needed

    res.status(200).json({
      totalDonations,
      totalExpiryItems,
      readyToDonate,
      donated,
      pendingPickups,
      totalPoints: pointsRedeemed,
      last7DaysDates,
      donationHistory,
      expiryHistory,
      readyToDonateHistory,
      donatedHistory,
      pointsHistory, // added points daily history here
    })
  } catch (error) {
    console.error('Stats fetch failed:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
