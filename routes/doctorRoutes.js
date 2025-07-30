const express = require('express');
const router = express.Router();
const docCtrl = require('../controllers/doctorControllers');
const {
    addConsultationValidator,
    updateConsultationValidator,
    getConsultationsValidator,
    getConsultationHistoryValidator,
    addMedicinePrescriptionValidator,
    updateMedicinePrescriptionValidator,
    getMedPrescriptionsValidator,
    getMedicinePrescriptionHistoryValidator,
    addLabPrescriptionValidator,
    updateLabPrescriptionValidator,
    getTestPrescriptionsValidator
} = require('../validators/doctorValidators');

//Consultation notes
router.post('/consultation', addConsultationValidator, docCtrl.addConsultation);
router.put('/consultation/:id', updateConsultationValidator, docCtrl.updateConsultation);
router.get('/consultations', getConsultationsValidator, docCtrl.getConsultations);
router.get('/consultation-history', getConsultationHistoryValidator, docCtrl.getConsultationHistory);

//Medicine Prescription notes
router.post('/medicine-prescription', addMedicinePrescriptionValidator, docCtrl.addmedPrescription);
router.put('/medicine-prescription/:id', updateMedicinePrescriptionValidator, docCtrl.updatemedPrescription);
router.get('/medicine-prescriptions', getMedPrescriptionsValidator, docCtrl.getMedPrescriptions);
router.get('/medicine-prescription-history', getMedicinePrescriptionHistoryValidator, docCtrl.getMedicinePrescriptionHistory);

//LabTest Prescription notes
router.post('/lab-prescription', addLabPrescriptionValidator, docCtrl.addlabPrescription);
router.put('/lab-prescription/:id', updateLabPrescriptionValidator, docCtrl.updatelabPrescription);
router.get('/test-prescriptions', getTestPrescriptionsValidator, docCtrl.getTestPrescriptions);

module.exports = router;
