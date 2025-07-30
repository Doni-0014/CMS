const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  appointment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Appointment", 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0 
  },
  details: { 
    type: String, 
    default: "" 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
