const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/pharmacist/medicineController');
const inventoryController = require('../controllers/pharmacist/inventoryController');
const { medicineValidationRules } = require('../validators/pharmacist/medicineValidator');
const { inventoryValidationRules } = require('../validators/pharmacist/inventoryValidator');
const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// 🔹 Medicine Routes
router.post('/medicines', medicineValidationRules, validate, medicineController.createMedicine);
router.get('/medicines/:id', medicineController.getMedicineById);
router.get('/medicines', medicineController.getAllMedicines);
router.put('/medicines/:id', medicineValidationRules, validate, medicineController.updateMedicine);
router.patch('/medicines/:id/deactivate', medicineController.deactivateMedicine);

// 🔹 Inventory Routes
router.post('/inventory/medicine', inventoryValidationRules, validate, inventoryController.addInventory);
router.put('/inventory/medicine/:id', inventoryValidationRules, validate, inventoryController.updateInventory);
router.get('/inventory/medicine/:medicineId', inventoryController.getInventoryByMedicine);
router.get('/inventory/medicine', inventoryController.getAllInventory);
router.patch('/inventory/medicine/:id/flag-low', inventoryController.flagLowStock);

module.exports = router;

