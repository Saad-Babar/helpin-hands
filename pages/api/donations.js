import Donation from '../../models/Donation';
import { connectToDB } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

function calculatePoints(mealSize) {
  switch (mealSize) {
    case '1-2': return 20;
    case '3-5': return 40;
    case '6+': return 60;
    default: return 0;
  }
}

export default async function handler(req, res) {
  await connectToDB();

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  const userId = decoded.userId;

  if (req.method === 'POST') {
    const {
      foodType,
      mealSize,
      details = {},
      location = {},
      attachments = []
    } = req.body;

    if (!foodType || !mealSize) {
      return res.status(400).json({ message: 'Food type and meal size are required' });
    }

    const points = calculatePoints(mealSize);

    const donation = new Donation({
      userId,
      foodType,
      mealSize,
      points,
      details: {
        foodName: details.foodName || '',
        storageCondition: details.storageCondition || '',
        packagingStatus: details.packagingStatus || '',
        cookedDate: details.cookedDate || '',
        anyNote: details.anyNote || ''
      },
      location: {
        deliveryOptions: location.deliveryOptions || '',
        pickupAddress: location.pickupAddress || '',
        phoneNumber: location.phoneNumber || '',
        country: location.country || '',
        state: location.state || '',
        city: location.city || ''
      },

      attachments: attachments.map(a => a.name || '')
    });

    await donation.save();

    return res.status(201).json({ message: 'Donation saved successfully', donation });
  }

  if (req.method === 'GET') {
    try {
      const donations = await Donation.find({ userId });

      const totalPoints = donations.reduce((sum, d) => sum + (d.points || 0), 0);

      return res.status(200).json({ totalPoints });
    } catch (error) {
      console.error('Error fetching points:', error.message);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
