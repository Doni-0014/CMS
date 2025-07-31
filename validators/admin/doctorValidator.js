const { body } = require('express-validator');

exports.validateDoctor = [
  body('name').notEmpty().withMessage('Doctor name is required'),
  body('specialization').isMongoId().withMessage('Valid specialization ID is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('active').optional().isBoolean().withMessage('Active must be a boolean')
];
