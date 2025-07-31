const { body } = require('express-validator');

exports.validateStaff = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isMongoId().withMessage('Valid role ID is required'),
  body('active').optional().isBoolean().withMessage('Active must be a boolean')
];
