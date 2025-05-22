import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Tab 1 fields
  foodType: { type: String, required: true },
  mealSize: { type: String, required: true },

  // Tab 2 fields (details)
  details: {
    foodName: { type: String },
    storageCondition: { type: String },
    packagingStatus: { type: String },
    cookedDate: { type: Date },       // Storing as Date type for accuracy
    anyNote: { type: String }
  },

  // Tab 3 fields (location)
  location: {
    deliveryOptions: { type: String },
    pickupAddress: { type: String },
    phoneNumber: { type: String }
  },

  // Tab 4 (attachments)
  attachments: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);
