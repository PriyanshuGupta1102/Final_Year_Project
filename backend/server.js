const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sgMail = require('@sendgrid/mail');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.log('⚠️  SendGrid API key not configured');
}

app.use('/api', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Clinico API Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));