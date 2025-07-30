const Appointment = require("../../models/receptionist/Appointment");
const Patient = require("../../models/receptionist/Patient");
const Doctor = require("../../models/admin/Doctor");
const { validationResult } = require("express-validator");

exports.schedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Additional validation to ensure IDs exist
    const patient = await Patient.findById(req.body.patientId);
    const doctor = await Doctor.findById(req.body.doctorId);

    if (!patient) {
      return res.status(400).json({ error: "Patient not found" });
    }

    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    const appt = new Appointment({
      patient: req.body.patientId,
      doctor: req.body.doctorId,
      date: req.body.date,
    });
    
    await appt.save();
    res.status(201).json(appt);
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, { new: true });
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};

exports.getById = async (req, res) => {
  const appt = await Appointment.findById(req.params.appointmentId).populate("patient doctor");
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};

exports.listByDate = async (req, res) => {
  const appts = await Appointment.find({ date: new Date(req.query.date) }).populate("patient doctor");
  res.json(appts);
};

exports.listByPatient = async (req, res) => {
  const appts = await Appointment.find({ patient: req.params.patientId }).populate("doctor");
  res.json(appts);
};

exports.listByDoctor = async (req, res) => {
  const appts = await Appointment.find({ doctor: req.params.doctorId }).populate("patient");
  res.json(appts);
};

exports.listByStatus = async (req, res) => {
  const appts = await Appointment.find({ status: req.query.status }).populate("patient doctor");
  res.json(appts);
};

exports.cancel = async (req, res) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.appointmentId, { status: "cancelled" }, { new: true });
  if (!appt) return res.status(404).json({ error: "Not found" });
  res.json(appt);
};
