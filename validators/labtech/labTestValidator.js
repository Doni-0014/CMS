const { body } = require('express-validator');

const labTestValidationRules = [
  body('name').notEmpty().withMessage('Lab test name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

module.exports = {
  labTestValidationRules
};
