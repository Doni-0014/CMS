const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  contact: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
