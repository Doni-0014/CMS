const express = require('express');
const router = express.Router();
const docCtrl = require('../controllers/doctorControllers');

//Consultation notes
router.post('/',docCtrl.addConsultation);
router.put('/:id', docCtrl.updateConsultation);
// router.get('/:id/receptionist', docCtrl.getConsultationsByAppointmentID);
// router.get('/:id/admin', docCtrl.getConsultationsByDoctorID);

//Medicine Prescription notes
router.post('/',docCtrl.addmedPrescription);
router.put('/:id', docCtrl.updatemedPrescription);
// router.get('/:id/receptionist', docCtrl.getmedPrescriptionByAppointmentID);
// router.get('/:id/receptionist', docCtrl.getmedPrescriptionByPatientID);

//LabTest Prescription notes
router.post('/',docCtrl.addlabPrescription);
router.get('/:id', docCtrl.updatelabPrescription);
// router.get('/:id/receptionist', docCtrl.gettestPrescriptionByAppointmentID);
// router.get('/:id/receptionist', docCtrl.gettestPrescriptionByPatientID);

module.exports = router;
