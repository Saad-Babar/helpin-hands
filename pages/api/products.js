import path from 'path';
import { mkdir, copyFile, unlink } from 'fs/promises';
import formidable from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../../utils/db';
import mongoose from 'mongoose';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ProductSchema = new mongoose.Schema({
  productName: String,
  description: String,
  price: String,
  condition: String,
  country: String,
  state: String,
  city: String,
  consent: Boolean,
  mainImageIdx: Number,
  images: [String],
  phone: String,
  email: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    const fields = {};
    const files = {};

    form.on('field', (name, value) => {
      fields[name] = value;
    });
    form.on('file', (name, file) => {
      if (!files[name]) files[name] = [];
      files[name].push(file);
    });
    form.on('end', () => {
      resolve({ fields, files });
    });
    form.on('error', (err) => {
      reject(err);
    });
    form.parse(req, (err) => {
      if (err) reject(err);
    });
  });
}

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const { userId, role } = req.query;
      let products;
      if (role === 'admin') {
        products = await Product.find({}).sort({ createdAt: -1 });
      } else if (userId) {
        products = await Product.find({ userId: userId }).sort({ createdAt: -1 });
      } else {
        return res.status(400).json({ error: 'Missing userId or role' });
      }
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    console.log('FIELDS:', fields);
    const {
      productName,
      description,
      price,
      condition,
      country,
      state,
      city,
      consent,
      mainImageIdx,
      phone,
      email,
      userId,
    } = fields;

    // Convert userId to string if it's an object
    let userIdStr = userId;
    if (userId && typeof userId === 'object' && userId.toString) {
      userIdStr = userId.toString();
    }
    if (userId && typeof userId !== 'string') {
      userIdStr = String(userId);
    }

    console.log('FIELDS:', fields);

    // Handle images
    const images = [];
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    await mkdir(uploadDir, { recursive: true });
    const fileList = files.images || [];
    for (let i = 0; i < Math.min(fileList.length, 5); i++) {
      const file = fileList[i];
      const ext = path.extname(file.originalFilename);
      const newFilename = `${uuidv4()}${ext}`;
      const finalPath = path.join(uploadDir, newFilename);
      await copyFile(file.filepath, finalPath);
      await unlink(file.filepath);
      images.push(`/uploads/products/${newFilename}`);
    }

    const product = await Product.create({
      productName,
      description,
      price,
      condition,
      country,
      state,
      city,
      consent: consent === 'true' || consent === true,
      mainImageIdx: Number(mainImageIdx) || 0,
      images,
      phone,
      email,
      userId: userIdStr,
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
} 