const Patient = require("../../models/receptionist/Patient");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const patient = new Patient(req.body);
  await patient.save();
  res.status(201).json(patient);
};

exports.update = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.patientId, req.body, { new: true });
  if (!patient) return res.status(404).json({ error: "Not found" });
  res.json(patient);
};

exports.getById = async (req, res) => {
  const patient = await Patient.findById(req.params.patientId);
  if (!patient) return res.status(404).json({ error: "Not found" });
  res.json(patient);
};

exports.listAll = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

exports.deactivate = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.patientId, { active: false }, { new: true });
  if (!patient) return res.status(404).json({ error: "Not found" });
  res.json(patient);
};
