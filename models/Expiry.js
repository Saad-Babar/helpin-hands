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
  status: { type: String, default: 'ready to donate' }, // default here also works, optional
}, { timestamps: true, collection: 'expiry' });

export default mongoose.models.Expiry || mongoose.model('Expiry', ExpirySchema);
