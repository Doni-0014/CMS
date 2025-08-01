const express = require('express');
const router = express.Router();

const staffController = require('../controllers/admin/staffController');
const doctorController = require('../controllers/admin/doctorController');
const roleController = require('../controllers/admin/roleController');
const specializationController = require('../controllers/admin/specializationController');
const authController = require('../controllers/admin/authController');

const { validateStaff, handleValidationErrors: handleStaffValidationErrors } = require('../validators/admin/staffValidator');
const { validateDoctor } = require('../validators/admin/doctorValidator');
const { validateRole } = require('../validators/admin/roleValidator');
const { validateSpecialization } = require('../validators/admin/specializationValidator');
const { 
  validateAdminLogin, 
  validateCreateAdmin, 
  validateChangePassword, 
  handleValidationErrors: handleAuthValidationErrors 
} = require('../validators/admin/authValidator');
const { authenticateToken, requireSuperAdmin } = require('../middleware/authMiddleware');

// Auth Routes (Public)
router.post('/login', validateAdminLogin, handleAuthValidationErrors, authController.adminLogin);
router.post('/register', validateCreateAdmin, handleAuthValidationErrors, requireSuperAdmin, authController.createAdmin);

// Protected Routes
router.use(authenticateToken);

// Admin Profile Routes
router.get('/profile', authController.getAdminProfile);
router.post('/change-password', validateChangePassword, handleAuthValidationErrors, authController.changePassword);

// Staff Routes
router.post('/staff', validateStaff, handleStaffValidationErrors, staffController.createStaff);
router.put('/staff/:id', validateStaff, handleStaffValidationErrors, staffController.updateStaff);
router.get('/staff/:id', staffController.getStaffById);
router.get('/staff/staffid/:staffId', staffController.getStaffByStaffId);
router.get('/staff', staffController.getAllStaff);
router.patch('/staff/:id/deactivate', staffController.deactivateStaff);

// Role Routes
router.post('/roles', validateRole, roleController.createRole);
router.put('/roles/:id', validateRole, roleController.updateRole);
router.get('/roles/:id', roleController.getRoleById);
router.get('/roles', roleController.getAllRoles);
router.patch('/roles/:id/deactivate', roleController.deactivateRole);

// Doctor Routes
router.post('/doctors', validateDoctor, doctorController.createDoctor);
router.put('/doctors/:id', validateDoctor, doctorController.updateDoctor);
router.get('/doctors/:id', doctorController.getDoctorById);
router.get('/doctors', doctorController.getAllDoctors);
router.patch('/doctors/:id/deactivate', doctorController.deactivateDoctor);

// Specialization Routes
router.post('/specializations', validateSpecialization, specializationController.addSpecialization);
router.put('/specializations/:id', validateSpecialization, specializationController.updateSpecialization);
router.get('/specializations/:id', specializationController.getSpecializationById);
router.get('/specializations', specializationController.getAllSpecializations);

module.exports = router;
