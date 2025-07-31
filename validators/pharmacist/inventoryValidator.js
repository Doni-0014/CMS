const { body } = require('express-validator');

exports.inventoryValidationRules = [
  body('medicineId').notEmpty().withMessage('medicineId is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('lowStockFlag').optional().isBoolean().withMessage('lowStockFlag must be a boolean')
];
