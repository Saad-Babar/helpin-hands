import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'Inactive',
        enum: ['Active', 'Inactive', 'Banned'], // optional
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// ✅ Handle duplicate email error
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const err = new Error('Email already registered');
        err.isDuplicate = true;
        next(err);
    } else {
        next(error);
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
