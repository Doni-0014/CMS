const { body, validationResult } = require('express-validator');

// Validation rules for staff
const validateStaff = [
  // Name validation
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Phone validation
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Phone number can only contain numbers, spaces, hyphens, plus signs, and parentheses')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters'),

  // Date of Birth validation
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      
      // Check if birthday has occurred this year
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      if (age < 18) {
        throw new Error('Staff must be at least 18 years old');
      }
      
      if (age > 70) {
        throw new Error('Staff age cannot exceed 70 years');
      }
      
      return true;
    }),

  // Gender validation
  body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  // Role validation
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isMongoId()
    .withMessage('Valid role ID is required'),

  // Address validation (optional fields)
  body('address.street')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Street address must be between 5 and 200 characters'),

  body('address.city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),

  body('address.state')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('State must be between 2 and 50 characters'),

  body('address.zipCode')
    .optional()
    .trim()
    .matches(/^[0-9]{6}$/)
    .withMessage('ZIP code must be exactly 6 digits'),

  body('address.country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be between 2 and 50 characters'),

  // Emergency contact validation (optional fields)
  body('emergencyContact.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Emergency contact name must be between 2 and 100 characters'),

  body('emergencyContact.relationship')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Relationship must be between 2 and 50 characters'),

  body('emergencyContact.phone')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Emergency contact phone can only contain numbers, spaces, hyphens, plus signs, and parentheses')
    .isLength({ min: 10, max: 15 })
    .withMessage('Emergency contact phone must be between 10 and 15 characters'),

  // Active status validation
  body('active')
    .optional()
    .isBoolean()
    .withMessage('Active must be a boolean value')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

module.exports = {
  validateStaff,
  handleValidationErrors
};
