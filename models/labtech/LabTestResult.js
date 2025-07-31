const mongoose = require('mongoose');

const labTestResultSchema = new mongoose.Schema({
  labTestPrescriptionId: { type: String, required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  testType: { type: String, required: true },
  result: { type: String, required: true },
  notes: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LabTestResult', labTestResultSchema);
