const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dosage: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);
