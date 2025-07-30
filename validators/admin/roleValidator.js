const { body } = require('express-validator');

exports.validateRole = [
  body('name').notEmpty().withMessage('Role name is required'),
];