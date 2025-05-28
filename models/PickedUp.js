import mongoose from 'mongoose'

const PickedUpSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickedUpAt: { type: Date, default: Date.now }
})

export default mongoose.models.PickedUp || mongoose.model('PickedUp', PickedUpSchema)
