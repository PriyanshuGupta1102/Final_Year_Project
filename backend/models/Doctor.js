const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fees: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  image: { type: String, default: "https://via.placeholder.com/150" },
  role: { type: String, default: 'doctor' },
  otp: { type: String }, // OTP store karne ke liye
}, { timestamps: true });
module.exports = mongoose.model('Doctor', DoctorSchema);