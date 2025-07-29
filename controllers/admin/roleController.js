const Role = require('../../models/admin/Role');
const { validationResult } = require('express-validator');

exports.createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const role = new Role(req.body);
  await role.save();
  res.status(201).json(role);
};

exports.updateRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const role = await Role.findByIdAndUpdate(req.params.roleId, req.body, { new: true });
  res.json(role);
};

exports.getRoleById = async (req, res) => {
  const role = await Role.findById(req.params.roleId);
  res.json(role);
};

exports.getAllRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

exports.deactivateRole = async (req, res) => {
  const role = await Role.findByIdAndUpdate(req.params.roleId, { active: false }, { new: true });
  res.json(role);
};
