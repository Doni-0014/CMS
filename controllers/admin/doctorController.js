const Doctor = require('../../models/admin/Doctor');

exports.createDoctor = async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.status(201).json(doctor);
};

exports.updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true });
  res.json(doctor);
};

exports.getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.doctorId).populate('specialization');
  res.json(doctor);
};

exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate('specialization');
  res.json(doctors);
};

exports.deactivateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, { active: false }, { new: true });
  res.json(doctor);
};
