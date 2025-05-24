import jwt from 'jsonwebtoken';
import { connectToDB } from '../../lib/mongodb';
import Donation from '../../models/Donation';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await connectToDB();

    const donations = await Donation.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
