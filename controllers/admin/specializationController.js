const Specialization = require('../../models/admin/Specialization');
const { validationResult } = require('express-validator');

exports.addSpecialization = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const specialization = new Specialization(req.body);
    await specialization.save();
    res.status(201).json(specialization);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Specialization with this name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateSpecialization = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const specialization = await Specialization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(specialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecializationById = async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }
    res.json(specialization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSpecializations = async (req, res) => {
  const specializations = await Specialization.find();
  res.json(specializations);
};
