const { body, query } = require("express-validator");
const Appointment = require("../../models/receptionist/Appointment");

exports.generateBill = [
  body("appointmentId")
    .isMongoId()
    .withMessage("Appointment ID must be a valid MongoDB ObjectId")
    .custom(async (value) => {
      try {
        const appointment = await Appointment.findById(value);
        if (!appointment) {
          throw new Error("Appointment not found");
        }
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a valid number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),
  body("details")
    .optional()
    .isString()
    .withMessage("Details must be a string"),
];

exports.updateBill = [
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Amount must be a valid number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),
  body("details")
    .optional()
    .isString()
    .withMessage("Details must be a string"),
];

exports.listBillsByRange = [
  query("startDate")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("Start date must be a valid date format");
      }
      return true;
    })
    .withMessage("Start date must be a valid date format"),
  query("endDate")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("End date must be a valid date format");
      }
      return true;
    })
    .withMessage("End date must be a valid date format"),
];
