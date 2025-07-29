const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  amount: Number,
  details: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
