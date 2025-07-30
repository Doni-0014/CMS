const Appointment = require("../../models/receptionist/Appointment");
const Patient = require("../../models/receptionist/Patient");
const { validationResult } = require("express-validator");

exports.schedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const appt = new Appointment({
    patientId: req.body.patientId,
    doctorId: req.body.doctorId,
    date: req.body.date,
  });
  await appt.save();
  res.status(201).json(appt);
};

exports.update = async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};

exports.getById = async (req, res) => {
  const appt = await Appointment.findById(req.params.appointmentId).populate("patientId doctorId");
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};

exports.listByDate = async (req, res) => {
  const appts = await Appointment.find({ date: new Date(req.query.date) }).populate("patientId doctorId");
  res.json(appts);
};

exports.listByPatient = async (req, res) => {
  const appts = await Appointment.find({ patientId: req.params.patientId }).populate("doctorId");
  res.json(appts);
};

exports.listByDoctor = async (req, res) => {
  const appts = await Appointment.find({ doctorId: req.params.doctorId }).populate("patientId");
  res.json(appts);
};

exports.listByStatus = async (req, res) => {
  const appts = await Appointment.find({ status: req.query.status }).populate("patientId doctorId");
  res.json(appts);
};

exports.cancel = async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: "cancelled" }, { new: true });
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};