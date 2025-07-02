import mongoose from 'mongoose';

const ShopOrderSchema = new mongoose.Schema({
  cart: { type: Array, required: true },
  email: { type: String },
  fname: { type: String },
  lname: { type: String },
  company: { type: String },
  country: { type: String },
  post_code: { type: String },
  phone: { type: String },
  note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ShopOrder || mongoose.model('ShopOrder', ShopOrderSchema); 