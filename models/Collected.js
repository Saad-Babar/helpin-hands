// /models/Collected.js
import mongoose from 'mongoose';

const collectedSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collectedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Collected || mongoose.model('Collected', collectedSchema);
