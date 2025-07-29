const { body } = require("express-validator");

exports.registerPatient = [
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("dob").isISO8601(),
  body("gender").isIn(["male","female","other"]),
  body("contact").optional().isMobilePhone(),
];

exports.updatePatient = [
  body("firstName").optional().notEmpty(),
  body("lastName").optional().notEmpty(),
  body("dob").optional().isISO8601(),
  body("gender").optional().isIn(["male","female","other"]),
  body("contact").optional().isMobilePhone(),
];
