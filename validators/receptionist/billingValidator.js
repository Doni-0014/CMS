const { body, query } = require("express-validator");

exports.generateBill = [
  body("appointmentId").isMongoId(),
  body("amount").isNumeric(),
];

exports.updateBill = [
  body("amount").optional().isNumeric(),
  body("details").optional().isString(),
];

exports.listBillsByRange = [
  query("startDate").isISO8601(),
  query("endDate").isISO8601(),
];
