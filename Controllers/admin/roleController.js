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
  
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
};

exports.deactivateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
