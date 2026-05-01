const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  recordName: { type: String, required: true },
  recordType: { type: String, default: 'General' },
  fileUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  doctorName: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);