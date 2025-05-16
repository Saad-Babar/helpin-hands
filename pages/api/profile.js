// /pages/api/profile.js
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { connectToDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    await connectToDB();

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token found' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
}
