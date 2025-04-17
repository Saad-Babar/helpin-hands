import connectDB from '../../utils/db';
import Registration from '../../models/Registration';

export default async function handler(req, res) {
  await connectDB();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const newRegistration = await Registration.create(req.body);
    res.status(201).json({ success: true, data: newRegistration });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      success: false,
      error: error.message,
      validationErrors: error.errors 
    });
  }
}