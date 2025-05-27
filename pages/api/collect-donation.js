import { connectToDB } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import Collected from '../../models/Collected';
import Donation from '../../models/Donation';
import User from '../../models/User';
import mongoose from 'mongoose';
import { sendDonationCollectedEmail } from '../../lib/sendEmail'; // ✅ import email sender

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connectToDB();

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { donationId } = req.body;

  if (!donationId) {
    return res.status(400).json({ message: 'Donation ID is required' });
  }

  const donation = await Donation.findById(donationId);
  if (!donation) {
    return res.status(404).json({ message: 'Donation not found' });
  }

  const user = await User.findById(decoded.userId).lean();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const alreadyCollected = await Collected.findOne({ donationId, collectedBy: user._id });
  if (alreadyCollected) {
    return res.status(400).json({ message: 'You have already collected this donation' });
  }

  const collectedEntry = new Collected({
    donationId: new mongoose.Types.ObjectId(donationId),
    collectedBy: user._id,
    collectedAt: new Date(),
  });

  await collectedEntry.save();

  // ✅ Update the donation status to 'collected'
  await Donation.findByIdAndUpdate(donationId, {
    status: 'collected'
  });

  // ✅ Send email to the donor
    // ✅ Send email to the donor
  try {
    const donor = await User.findById(donation.userId);
    if (donor?.email) {
      const collectorInfo = {
        name: user.name || 'Anonymous',
        phone: user.phone || 'Not provided',
        email: user.email || 'No email'
      };
      await sendDonationCollectedEmail(
        donor.email,
        donation.details?.foodName || 'your food donation',
        collectorInfo
      );
    }
  } catch (emailErr) {
    console.error('Failed to send collection email:', emailErr.message);
  }


  return res.status(201).json({ message: 'Donation marked as collected and donor notified' });
}
