import Donation from '../../models/Donation';
import { connectToDB } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to DB
    await connectToDB();

    // Parse cookies to get token
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

    // Extract all expected fields from request body
    const {
      foodType,
      mealSize,
      details = {},        // tab 2 data
      location = {},       // tab 3 data
     attachments = []
    } = req.body;

    // Validate required fields (add more if needed)
    if (!foodType) {
      return res.status(400).json({ message: 'Food type is required' });
    }
    if (!mealSize) {
      return res.status(400).json({ message: 'Meal size is required' });
    }

    // Create the new Donation document
        // Create the new Donation document
    const donation = new Donation({
      userId,
      foodType,
      mealSize,
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
        phoneNumber: location.phoneNumber || ''
      },
      attachments: attachments.map(a => a.name || '')

    });

    console.log('Incoming Data:', {
      userId,
      foodType,
      mealSize,
      details,
      location,
      attachments: attachments.map(a => a.name || '')

    });

    await donation.save();



    return res.status(201).json({ message: 'Donation saved successfully', donation });

  } catch (error) {
    console.error('Donation API Error:', error.message, error.stack);

    return res.status(500).json({ message: 'Server error' });
  }
}

