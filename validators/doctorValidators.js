const { body, query, param, validationResult } = require('express-validator');

// Validation helper function
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// Consultation validators
const addConsultationValidator = [
    body('appointmentId')
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    body('doctorId')
        .isMongoId()
        .withMessage('Doctor ID must be a valid MongoDB ID'),
    body('patientId')
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    body('symptoms')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Symptoms must be a string between 1 and 1000 characters'),
    body('diagnosis')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Diagnosis must be a string between 1 and 1000 characters'),
    body('Notes')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Notes must be a string between 1 and 2000 characters'),
    handleValidationErrors
];

const updateConsultationValidator = [
    param('id')
        .isMongoId()
        .withMessage('Consultation ID must be a valid MongoDB ID'),
    body('symptoms')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Symptoms must be a string between 1 and 1000 characters'),
    body('diagnosis')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Diagnosis must be a string between 1 and 1000 characters'),
    body('Notes')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Notes must be a string between 1 and 2000 characters'),
    handleValidationErrors
];

const getConsultationsValidator = [
    query('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    query('doctorId')
        .optional()
        .isMongoId()
        .withMessage('Doctor ID must be a valid MongoDB ID'),
    query('patientId')
        .optional()
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    handleValidationErrors
];

const getConsultationHistoryValidator = [
    query('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    query('doctorId')
        .optional()
        .isMongoId()
        .withMessage('Doctor ID must be a valid MongoDB ID'),
    query('patientId')
        .optional()
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    handleValidationErrors
];

// Medicine Prescription validators
const addMedicinePrescriptionValidator = [
    body('appointmentId')
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    body('patientId')
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    body('medicines')
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Medicines must be a string between 1 and 1000 characters'),
    body('description')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be a string between 1 and 1000 characters'),
    handleValidationErrors
];

const updateMedicinePrescriptionValidator = [
    param('id')
        .isMongoId()
        .withMessage('Medicine Prescription ID must be a valid MongoDB ID'),
    body('medicines')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Medicines must be a string between 1 and 1000 characters'),
    body('description')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be a string between 1 and 1000 characters'),
    handleValidationErrors
];

const getMedPrescriptionsValidator = [
    query('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    query('patientId')
        .optional()
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    handleValidationErrors
];

const getMedicinePrescriptionHistoryValidator = [
    query('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    query('patientId')
        .optional()
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    handleValidationErrors
];

// Lab Test Prescription validators
const addLabPrescriptionValidator = [
    body('appointmentId')
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    body('patientId')
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    body('labtests')
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Lab tests must be a string between 1 and 1000 characters'),
    body('description')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be a string between 1 and 1000 characters'),
    handleValidationErrors
];

const updateLabPrescriptionValidator = [
    param('id')
        .isMongoId()
        .withMessage('Lab Prescription ID must be a valid MongoDB ID'),
    body('labtests')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Lab tests must be a string between 1 and 1000 characters'),
    body('description')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be a string between 1 and 1000 characters'),
    handleValidationErrors
];

const getTestPrescriptionsValidator = [
    query('appointmentId')
        .optional()
        .isMongoId()
        .withMessage('Appointment ID must be a valid MongoDB ID'),
    query('patientId')
        .optional()
        .isMongoId()
        .withMessage('Patient ID must be a valid MongoDB ID'),
    handleValidationErrors
];

module.exports = {
    // Consultation validators
    addConsultationValidator,
    updateConsultationValidator,
    getConsultationsValidator,
    getConsultationHistoryValidator,
    
    // Medicine Prescription validators
    addMedicinePrescriptionValidator,
    updateMedicinePrescriptionValidator,
    getMedPrescriptionsValidator,
    getMedicinePrescriptionHistoryValidator,
    
    // Lab Test Prescription validators
    addLabPrescriptionValidator,
    updateLabPrescriptionValidator,
    getTestPrescriptionsValidator
};