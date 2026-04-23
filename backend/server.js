const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. MIDDLEWARE (Crucial: CORS must be before routes)
app.use(cors()); 
app.use(express.json());

// 3. OTP EMAIL CONFIGURATION
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 4. OTP ROUTE
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000);

  const mailOptions = {
    from: `"Clinico Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Clinico Access OTP',
    text: `Your One-Time Password for Clinico is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP Sent to ${email}: ${otp}`);
    res.status(200).json({ success: true, secret: otp });
  } catch (error) {
    console.error("Nodemailer Error:", error.message);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

// 5. SERVER START
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));