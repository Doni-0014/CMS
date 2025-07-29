const { body } = require('express-validator');

exports.validateRole = [
  body('roleName').notEmpty().withMessage('Role name is required'),
  body('permissions').isArray().withMessage('Permissions must be an array'),
];
