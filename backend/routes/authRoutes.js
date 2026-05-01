const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');

if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.')) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const JWT_SECRET = process.env.JWT_SECRET || 'clinico_secret_key_2024';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '7d' });
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All required fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password,
      role: role || 'patient',
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    if (role === 'admin' && user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    if (role === 'doctor' && user.role !== 'doctor') {
      return res.status(401).json({ success: false, message: 'Invalid doctor credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        specialization: user.specialization,
        experience: user.experience,
        consultationFee: user.consultationFee,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/doctor-register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, specialization, experience, fees, gender } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || '',
      password,
      role: 'doctor',
      specialization: specialization || '',
      experience: parseInt(experience) || 0,
      consultationFee: parseInt(fees) || 0,
      gender: gender || '',
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Doctor registration successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const { patientId, patientName, doctorId, doctorName, doctorSpecialization, date, time, fee } = req.body;

    const appointment = await Appointment.create({
      patientId,
      patientName,
      doctorId,
      doctorName,
      doctorSpecialization,
      date,
      time,
      fee,
      status: 'confirmed',
      paymentStatus: 'paid',
    });

    res.status(201).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/appointments/:userId/:role', async (req, res) => {
  try {
    const { userId, role } = req.params;
    let appointments;

    if (role === 'patient') {
      appointments = await Appointment.find({ patientId: userId }).sort({ createdAt: -1 });
    } else if (role === 'doctor') {
      appointments = await Appointment.find({ doctorId: userId }).sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find().sort({ createdAt: -1 });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/appointments-all', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.role === 'doctor') {
      await Appointment.deleteMany({ doctorId: req.params.id });
    } else if (user.role === 'patient') {
      await Appointment.deleteMany({ patientId: req.params.id });
      await MedicalRecord.deleteMany({ patientId: req.params.id });
    }

    res.json({ success: true, message: 'User and related records deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { name, specialization, experience, consultationFee, gender, profileImage, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, specialization, experience, consultationFee, gender, profileImage, phone },
      { new: true }
    ).select('-password');

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalAppointments = await Appointment.countDocuments();
    const totalRevenue = await Appointment.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$fee' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        revenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/medical-records', async (req, res) => {
  try {
    const { patientId, patientName, recordName, recordType, fileUrl, description, doctorName } = req.body;

    const record = await MedicalRecord.create({
      patientId,
      patientName,
      recordName,
      recordType,
      fileUrl,
      description,
      doctorName,
    });

    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/medical-records/:patientId', async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patientId: req.params.patientId }).sort({ createdAt: -1 });
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;