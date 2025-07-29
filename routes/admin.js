const express = require('express');
const router = express.Router();

const staffController = require('../controllers/admin/staffController');
const roleController = require('../controllers/admin/roleController');
const doctorController = require('../controllers/admin/doctorController');
const specializationController = require('../controllers/admin/specializationController');


router.post('/staff', staffController.createStaff);
router.put('/staff/:staffId', staffController.updateStaff);
router.get('/staff/:staffId', staffController.getStaffById);
router.get('/staff', staffController.getAllStaff);
router.patch('/staff/:staffId/deactivate', staffController.deactivateStaff);

router.post('/roles', roleController.createRole);
router.put('/roles/:roleId', roleController.updateRole);
router.get('/roles/:roleId', roleController.getRoleById);
router.get('/roles', roleController.getAllRoles);
router.patch('/roles/:roleId/deactivate', roleController.deactivateRole);

router.post('/doctors', doctorController.createDoctor);
router.put('/doctors/:doctorId', doctorController.updateDoctor);
router.get('/doctors/:doctorId', doctorController.getDoctorById);
router.get('/doctors', doctorController.getAllDoctors);
router.patch('/doctors/:doctorId/deactivate', doctorController.deactivateDoctor);

router.post('/specializations', specializationController.addSpecialization);
router.put('/specializations/:specializationId', specializationController.updateSpecialization);
router.get('/specializations/:specializationId', specializationController.getSpecializationById);
router.get('/specializations', specializationController.getAllSpecializations);

module.exports = router;
