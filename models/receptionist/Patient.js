const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  contact: String,
  email: String,
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
