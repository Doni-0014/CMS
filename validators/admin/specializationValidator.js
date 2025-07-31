const { body } = require('express-validator');

exports.validateSpecialization = [
  body('name').notEmpty().withMessage('Specialization name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];
