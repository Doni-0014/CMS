const express = require("express");
const router = express.Router();

const patientController = require("../controllers/receptionist/patientController");
const appointmentController = require("../controllers/receptionist/appointmentController");
const billingController = require("../controllers/receptionist/billingController");

const patientValidator = require("../validators/receptionist/patientValidator");
const appointmentValidator = require("../validators/receptionist/appointmentValidator");
const billingValidator = require("../validators/receptionist/billingValidator");

// Helper endpoints for debugging
router.get("/debug/patients", async (req, res) => {
  try {
    const Patient = require("../models/receptionist/Patient");
    const patients = await Patient.find({ active: true }).select('_id firstName lastName');
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/debug/doctors", async (req, res) => {
  try {
    const Doctor = require("../models/admin/Doctor");
    const doctors = await Doctor.find({ active: true }).select('_id name');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Patient
router.post("/patients", patientValidator.registerPatient, patientController.register);
router.put("/patients/:patientId", patientValidator.updatePatient, patientController.update);
router.get("/patients/:patientId", patientController.getById);
router.get("/patients", patientController.listAll);
router.patch("/patients/:patientId/deactivate", patientController.deactivate);

// Appointment
router.post("/appointments", appointmentValidator.scheduleAppointment, appointmentController.schedule);
router.put("/appointments/:appointmentId", appointmentValidator.updateAppointment, appointmentController.update);
router.get("/appointments/:appointmentId", appointmentController.getById);
router.get("/appointments", appointmentValidator.listByDate, appointmentController.listByDate);
router.patch("/appointments/:appointmentId/cancel", appointmentController.cancel);

// Listings by patient/doctor/status
router.get("/appointments/patient/:patientId", appointmentController.listByPatient);
router.get("/appointments/doctor/:doctorId", appointmentController.listByDoctor);
router.get("/appointments/status", appointmentValidator.listByStatus, appointmentController.listByStatus);

// Billing
router.post("/billing", billingValidator.generateBill, billingController.generate);
router.put("/billing/:appointmentId", billingValidator.updateBill, billingController.update);
router.get("/billing/:appointmentId", billingController.getByAppointmentId);
router.get("/billing", billingValidator.listBillsByRange, billingController.listByDateRange);

module.exports = router;
