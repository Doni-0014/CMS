const express = require('express');
const router = express.Router();
const labTestController = require('../controllers/labtech/labTestController');
const labTestResultController = require('../controllers/labtech/labTestResultController');
const { labTestValidationRules } = require('../validators/labtech/labTestValidator');
const { labResultValidationRules } = require('../validators/labtech/labResultValidator');
const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Lab Test routes
router.post('/labtests', labTestValidationRules, validate, labTestController.createLabTest);
router.get('/labtests/:id', labTestController.getLabTestById);
router.get('/labtests', labTestController.getAllLabTests);
router.put('/labtests/:id', labTestValidationRules, validate, labTestController.updateLabTest);

// Lab Test Result routes
router.post('/labtestresults/:labTestPrescriptionId', labResultValidationRules, validate, labTestResultController.recordResult);
router.get('/labtestresults/appointment/:appointmentId', labTestResultController.getByAppointment);
router.get('/labtestresults', labTestResultController.listByDateRange);
router.patch('/labtestresults/:labTestPrescriptionId/deactivate', labTestResultController.deactivatePrescription);

module.exports = router;