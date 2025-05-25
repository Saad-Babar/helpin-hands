import mongoose from 'mongoose';

const ExpirySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  itemName: String,
  quantity: String,
  expiryDate: String,
  foodCategory: String,
  remindBefore: String,
}, { timestamps: true, collection: 'expiry' });

export default mongoose.models.Expiry || mongoose.model('Expiry', ExpirySchema);
