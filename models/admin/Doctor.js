const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' },
  email: String,
  phone: String,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);
