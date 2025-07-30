const Bill = require("../../models/receptionist/Billing");
const Appointment = require("../../models/receptionist/Appointment");
const { validationResult } = require("express-validator");

exports.generate = async (req, res) => {
  try {
    // Log the incoming request for debugging
    console.log('=== BILL GENERATION REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('================================');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if appointment exists
    const appointment = await Appointment.findById(req.body.appointmentId);
    if (!appointment) {
      return res.status(400).json({ error: "Appointment not found" });
    }

    // Check if bill already exists for this appointment
    const existingBill = await Bill.findOne({ appointment: req.body.appointmentId });
    if (existingBill) {
      return res.status(400).json({ error: "Bill already exists for this appointment" });
    }

    // Create bill object
    const billData = {
      appointment: req.body.appointmentId,
      amount: req.body.amount,
      details: req.body.details || ""
    };
    
    console.log('Creating bill with data:', JSON.stringify(billData, null, 2));

    const bill = new Bill(billData);
    
    console.log('Bill object created:', bill);
    
    await bill.save();
    console.log('✅ Bill generated successfully:', bill._id);
    res.status(201).json(bill);
  } catch (error) {
    console.error("Error generating bill:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).populate("appointment");
    res.json(bills);
  } catch (error) {
    console.error("Error getting all bills:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId).populate("appointment");
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (error) {
    console.error("Error getting bill by ID:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { appointment: req.params.appointmentId },
      req.body, 
      { new: true, runValidators: true }
    );
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.getByAppointmentId = async (req, res) => {
  try {
    const bill = await Bill.findOne({ appointment: req.params.appointmentId }).populate("appointment");
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (error) {
    console.error("Error getting bill:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

exports.listByDateRange = async (req, res) => {
  try {
    const start = new Date(req.query.startDate);
    const end = new Date(req.query.endDate);
    const bills = await Bill.find({ date: { $gte: start, $lte: end } }).populate("appointment");
    res.json(bills);
  } catch (error) {
    console.error("Error listing bills by date range:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
