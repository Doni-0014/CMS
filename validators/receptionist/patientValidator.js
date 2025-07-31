const { body } = require("express-validator");

exports.registerPatient = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("dob").isISO8601().withMessage("Valid date of birth is required"),
  body("gender").isIn(["male","female","other"]).withMessage("Gender must be male, female, or other"),
  body("contact").notEmpty().withMessage("Contact number is required"),
  body("email").optional().isEmail().withMessage("Valid email is required if provided"),
];

exports.updatePatient = [
  body("firstName").optional().notEmpty().withMessage("First name cannot be empty"),
  body("lastName").optional().notEmpty().withMessage("Last name cannot be empty"),
  body("dob").optional().isISO8601().withMessage("Valid date of birth is required"),
  body("gender").optional().isIn(["male","female","other"]).withMessage("Gender must be male, female, or other"),
  body("contact").optional().notEmpty().withMessage("Contact number cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required if provided"),
];
