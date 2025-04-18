// import mongoose from 'mongoose';

// const registrationSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Name is required'] 
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Email is required'],
//     match: [/.+\@.+\..+/, 'Please enter a valid email'] 
//   },
//   subject: String,
//   phone: {
//     type: String,
//     validate: {
//       validator: function(v) {
//         return /\d{10}/.test(v); // Simple phone validation
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
//   },
//   message: String,
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   }
// });

// // Check if model already exists to prevent OverwriteModelError
// export default mongoose.models.Registration || 
//        mongoose.model('Registration', registrationSchema);