const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization', required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);
