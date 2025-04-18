// Create a temporary script at pages/api/verifyIndex.js
import { connectToDB } from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await connectToDB();
    const indexInfo = await User.collection.indexInformation();
    console.log('Indexes:', indexInfo);
    
    // Create index if it doesn't exist
    await User.collection.createIndex({ email: 1 }, { unique: true });
    
    return res.status(200).json({ indexes: indexInfo });
  } catch (error) {
    console.error('Index verification failed:', error);
    return res.status(500).json({ error: error.message });
  }
}