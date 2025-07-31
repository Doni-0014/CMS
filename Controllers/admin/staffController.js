const Staff = require('../../models/admin/Staff');
const { validationResult } = require('express-validator');

exports.createStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const staff = new Staff(req.body);
  await staff.save();
  res.status(201).json(staff);
};

exports.updateStaff = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(staff);
};

exports.getStaffById = async (req, res) => {
  const staff = await Staff.findById(req.params.id).populate('role');
  res.json(staff);
};

exports.getStaffByStaffId = async (req, res) => {
  try {
    const staff = await Staff.findOne({ staffId: req.params.staffId }).populate('role');
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found with the given staff ID' });
    }
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error finding staff', error: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
  const staff = await Staff.find().populate('role');
  res.json(staff);
};

exports.deactivateStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.staffId, { active: false }, { new: true });
  res.json(staff);
};
