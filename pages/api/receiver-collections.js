import jwt from 'jsonwebtoken';
import { connectToDB } from '../../lib/mongodb';
import Collected from '../../models/Collected'; // Adjust path as needed

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDB();

    const token = req.cookies.token;  // Your JWT cookie name
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    const userId = decoded.userId;  // depends on how you set the token payload
    if (!userId) {
      return res.status(400).json({ message: 'User ID missing in token' });
    }

    const collectedCount = await Collected.countDocuments({ collectedBy: userId });

    return res.status(200).json({ collectedCount });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
