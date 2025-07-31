const LabTest = require('../../models/labtech/LabTest');
const { validationResult } = require('express-validator');

exports.createLabTest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const labTest = await LabTest.create(req.body);
    res.status(201).json(labTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLabTestById = async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.id);
    if (!labTest) return res.status(404).json({ message: 'Lab test not found' });
    res.json(labTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find();
    res.json(labTests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLabTest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!labTest) return res.status(404).json({ message: 'Lab test not found' });
    res.json(labTest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};