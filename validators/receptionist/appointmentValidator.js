const { body, query } = require("express-validator");
const Patient = require("../../models/receptionist/Patient");
const Doctor = require("../../models/admin/Doctor");

exports.scheduleAppointment = [
  body("patientId")
    .isMongoId()
    .withMessage("Patient ID must be a valid MongoDB ObjectId")
    .custom(async (value) => {
      const patient = await Patient.findById(value);
      if (!patient) {
        throw new Error("Patient not found");
      }
      if (!patient.active) {
        throw new Error("Patient is not active");
      }
      return true;
    }),
  body("doctorId")
    .isMongoId()
    .withMessage("Doctor ID must be a valid MongoDB ObjectId")
    .custom(async (value) => {
      const doctor = await Doctor.findById(value);
      if (!doctor) {
        throw new Error("Doctor not found");
      }
      if (!doctor.active) {
        throw new Error("Doctor is not active");
      }
      return true;
    }),
  body("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date format")
    .custom((value) => {
      const appointmentDate = new Date(value);
      const now = new Date();
      if (appointmentDate < now) {
        throw new Error("Appointment date cannot be in the past");
      }
      return true;
    }),
];

exports.updateAppointment = [
  body("date").optional().isISO8601(),
  body("status").optional().isIn(["scheduled","cancelled","completed"]),
];

exports.listByDate = [
  query("date").isISO8601(),
];

exports.listByStatus = [
  query("status").isIn(["scheduled","cancelled","completed"]),
];
