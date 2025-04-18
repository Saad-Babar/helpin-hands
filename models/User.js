import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true
    },
    password: { // Add password field
        type: String,
        required: true
    },
    role: {       // Add role field
        type: String,
        required: true
    },
    address: {    // Add address field
        type: String,
        required: true
    },
    document: {   // Add document field for the file path
        type: String,
        required: false // Or true, depending on your requirements
    },
    subject: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// userSchema.index({ email: 1 }, { unique: true });

// Enhanced duplicate error handler
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const err = new Error('Email already registered');
        err.isDuplicate = true;   // Custom flag for easy detection
        next(err);
    } else {
        next(error);
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);