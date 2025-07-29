

const express = require('express');
const router = express.Router();

// Controllers
const doctorController = require('../controllers/admin/doctorController');
const staffController = require('../controllers/admin/staffController');
const roleController = require('../controllers/admin/roleController');
const specializationController = require('../controllers/admin/specializationController');

// Validators
const { validateDoctor } = require('../validators/admin/doctorValidator');
const { validateStaff } = require('../validators/admin/staffValidator');
const { validateRole } = require('../validators/admin/roleValidator');
const { validateSpecialization } = require('../validators/admin/specializationValidator');

// STAFF ROUTES
router.post('/staff', validateStaff, staffController.createStaff);
router.put('/staff/:id', validateStaff, staffController.updateStaff);
router.get('/staff/:id', staffController.getStaffById);
router.get('/staff', staffController.getAllStaff);
router.patch('/staff/:id/deactivate', staffController.deactivateStaff);

// ROLE ROUTES
router.post('/roles', validateRole, roleController.createRole);
router.put('/roles/:id', validateRole, roleController.updateRole);
router.get('/roles/:id', roleController.getRoleById);
router.get('/roles', roleController.getAllRoles);
router.patch('/roles/:id/deactivate', roleController.deactivateRole);

// DOCTOR ROUTES
router.post('/doctors', validateDoctor, doctorController.createDoctor);
router.put('/doctors/:id', validateDoctor, doctorController.updateDoctor);
router.get('/doctors/:id', doctorController.getDoctorById);
router.get('/doctors', doctorController.getAllDoctors);
router.patch('/doctors/:id/deactivate', doctorController.deactivateDoctor);

// SPECIALIZATION ROUTES
router.post('/specializations', validateSpecialization, specializationController.createSpecialization);
router.put('/specializations/:id', validateSpecialization, specializationController.updateSpecialization);
router.get('/specializations/:id', specializationController.getSpecializationById);
router.get('/specializations', specializationController.getAllSpecializations);

module.exports = router;


// validators/admin/staffValidator.js
const { body } = require('express-validator');

exports.validateStaff = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
];


// validators/admin/roleValidator.js
const { body } = require('express-validator');

exports.validateRole = [
  body('roleName').notEmpty().withMessage('Role name is required'),
  body('permissions').isArray().withMessage('Permissions must be an array'),
];


// validators/admin/doctorValidator.js
const { body } = require('express-validator');

exports.validateDoctor = [
  body('name').notEmpty().withMessage('Doctor name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('specializationId').notEmpty().withMessage('Specialization is required'),
  body('experience').optional().isNumeric().withMessage('Experience must be a number'),
];


// validators/admin/specializationValidator.js
const { body } = require('express-validator');

exports.validateSpecialization = [
  body('name').notEmpty().withMessage('Specialization name is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];
