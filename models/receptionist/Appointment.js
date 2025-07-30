const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: Date,
  status: { type: String, enum: ["scheduled", "cancelled", "completed"], default: "scheduled" },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
