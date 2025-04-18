import { connectToDB } from '../../lib/mongodb'; // Your connection utility
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDB();
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        exists: false
      });
    }

    const user = await User.findOne({ email }).select('_id');
    return res.status(200).json({ exists: !!user });

  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      exists: false 
    });
  }
}