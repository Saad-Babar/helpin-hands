import { connectToDB } from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDB();
    const { name, email, phone, subject, message } = req.body;

    // Server validation
    if (!email || !name || !phone) {
      return res.status(400).json({ 
        error: 'Name, email and phone are required' 
      });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      subject,
      message
    });

    return res.status(201).json({
      success: true,
      user: newUser
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email
    if (error.isDuplicate || error.code === 11000) {
      return res.status(409).json({
        error: 'EMAIL_EXISTS',
        message: 'This email is already registered'
      });
    }

    return res.status(500).json({
      error: 'REGISTRATION_FAILED',
      message: error.message
    });
  }
}