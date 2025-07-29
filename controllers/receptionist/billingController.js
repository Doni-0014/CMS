const Bill = require("../../models/receptionist/Billing");
const Appointment = require("../../models/receptionist/Appointment");
const { validationResult } = require("express-validator");

exports.generate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const bill = new Bill({
    appointment: req.body.appointmentId,
    amount: req.body.amount,
    details: req.body.details || ""
  });
  await bill.save();
  res.status(201).json(bill);
};

exports.update = async (req, res) => {
  const bill = await Bill.findOneAndUpdate(
    { appointment: req.params.appointmentId },
    req.body, { new: true }
  );
  if (!bill) return res.status(404).json({ error: "Not found" });
  res.json(bill);
};

exports.getByAppointmentId = async (req, res) => {
  const bill = await Bill.findOne({ appointment: req.params.appointmentId }).populate("appointment");
  if (!bill) return res.status(404).json({ error: "Not found" });
  res.json(bill);
};

exports.listByDateRange = async (req, res) => {
  const start = new Date(req.query.startDate);
  const end = new Date(req.query.endDate);
  const bills = await Bill.find({ date: { $gte: start, $lte: end } }).populate("appointment");
  res.json(bills);
};
