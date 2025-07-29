const Staff = require('../../models/admin/Staff');

exports.createStaff = async (req, res) => {
  const staff = new Staff(req.body);
  await staff.save();
  res.status(201).json(staff);
};

exports.updateStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(staff);
};

exports.getStaffById = async (req, res) => {
  const staff = await Staff.findById(req.params.id).populate('role');
  res.json(staff);
};

exports.getAllStaff = async (req, res) => {
  const staff = await Staff.find().populate('role');
  res.json(staff);
};

exports.deactivateStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(req.params.staffId, { active: false }, { new: true });
  res.json(staff);
};
