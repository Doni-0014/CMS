const { body } = require('express-validator');

const labResultValidationRules = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('testType').notEmpty().withMessage('Test type is required'),
  body('result').notEmpty().withMessage('Test result is required'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

module.exports = {
  labResultValidationRules
};
