import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

async function connectDB() {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Connection error:', error.message);
    throw new Error('Database connection failed');
  }
}

export default connectDB;