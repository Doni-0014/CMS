const { body, query } = require("express-validator");

exports.scheduleAppointment = [
  body("patientId").isMongoId(),
  body("doctorId").isMongoId(),
  body("date").isISO8601(),
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
