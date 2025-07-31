const { body } = require('express-validator');

exports.validateRole = [
  body('name').notEmpty().withMessage('Role name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('active').optional().isBoolean().withMessage('Active must be a boolean')
];