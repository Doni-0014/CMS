const { body } = require('express-validator');

exports.medicineValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('dosage').optional().isString().withMessage('Dosage must be a string'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];
