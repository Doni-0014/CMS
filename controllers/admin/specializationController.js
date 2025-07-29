const Specialization = require('../../models/admin/Specialization');

exports.addSpecialization = async (req, res) => {
  const specialization = new Specialization(req.body);
  await specialization.save();
  res.status(201).json(specialization);
};

exports.updateSpecialization = async (req, res) => {
  const specialization = await Specialization.findByIdAndUpdate(req.params.specializationId, req.body, { new: true });
  res.json(specialization);
};

exports.getSpecializationById = async (req, res) => {
  const specialization = await Specialization.findById(req.params.specializationId);
  res.json(specialization);
};

exports.getAllSpecializations = async (req, res) => {
  const specializations = await Specialization.find();
  res.json(specializations);
};
