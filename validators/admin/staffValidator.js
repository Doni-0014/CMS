const { body } = require('express-validator');

exports.validateStaff = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
];
