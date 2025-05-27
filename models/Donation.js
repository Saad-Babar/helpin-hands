import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Tab 1 fields
  foodType: { type: String, required: true },
  mealSize: { type: String, required: true },
  points: { type: Number, default: 0 },

  // Tab 2 fields (details)
  details: {
    foodName: { type: String },
    storageCondition: { type: String },
    packagingStatus: { type: String },
    cookedDate: { type: Date },
    anyNote: { type: String }
  },

  // Tab 3 fields (location)
  location: {
    deliveryOptions: { type: String },
    pickupAddress: { type: String },
    phoneNumber: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String }
  },

  // Tab 4 (attachments)
  attachments: { type: [String], default: [] },

  // Donation status (new field)
  status: {
    type: String,
    enum: ['available', 'collected'],
    default: 'available'
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);
