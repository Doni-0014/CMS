const { validationResult } = require('express-validator');
const LabTestResult = require('../../models/labtech/LabTestResult');

// Create or update a lab test result for a prescription
exports.recordResult = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { labTestPrescriptionId } = req.params;
  const { appointmentId, testType, result, notes } = req.body;

  try {
    let existing = await LabTestResult.findOne({ labTestPrescriptionId });
    if (existing) {
      existing.appointmentId = appointmentId;
      existing.testType = testType;
      existing.result = result;
      existing.notes = notes;
      existing.isActive = true;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newResult = new LabTestResult({
      labTestPrescriptionId,
      appointmentId,
      testType,
      result,
      notes
    });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a result by appointment ID
exports.getByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const result = await LabTestResult.findOne({ appointmentId, isActive: true });
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List results within a date range
exports.listByDateRange = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { startDate, endDate } = req.query;
  try {
    const results = await LabTestResult.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      isActive: true
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deactivate a result by prescription ID
exports.deactivatePrescription = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { labTestPrescriptionId } = req.params;
  try {
    const result = await LabTestResult.findOne({ labTestPrescriptionId, isActive: true });
    if (!result) return res.status(404).json({ message: 'Not found or already deactivated' });

    result.isActive = false;
    await result.save();
    res.json({ message: 'Deactivated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};