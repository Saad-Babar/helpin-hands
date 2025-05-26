import Donation from '../../models/Donation';
import User from '../../models/User';
import { connectToDB } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

  try {
    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const role = user.role;
    const userCity = user.city?.toLowerCase().trim();

    let donations;

    if (role === 'admin') {
      donations = await Donation.find().lean();
    } else if (role === 'NGO / Receiver') {
      if (!userCity) {
        return res.status(400).json({ message: 'City not specified in user address' });
      }

      donations = await Donation.find({
        'location.city': { $regex: new RegExp(`^${userCity}$`, 'i') }
      }).lean();
    } else {
      return res.status(403).json({ message: 'Access denied. Only Admins, NGOs, or Receivers can view donations.' });
    }

    // Get all userIds from donations and fetch those users' email and phone
    const userIds = [...new Set(donations.map(d => d.userId.toString()))];

    const users = await User.find({ _id: { $in: userIds } }, { email: 1, phone: 1 }).lean();

    // Create a map for quick lookup
    const userMap = {};
    users.forEach(u => {
      userMap[u._id.toString()] = { email: u.email, phone: u.phone };
    });

    // Attach email and phone to each donation
    const donationsWithUserInfo = donations.map(donation => ({
      ...donation,
      userEmail: userMap[donation.userId.toString()]?.email || '',
      userPhone: userMap[donation.userId.toString()]?.phone || ''
    }));

    return res.status(200).json({
      donations: donationsWithUserInfo,
      role,
      city: userCity || ''
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
