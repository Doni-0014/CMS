const {ConsultationNote, MedicinePresc, LabtestPresc} = require('../models/doctorModels');
// const receptionist = require('../models/receptionist');
// const admin = require('../models/admin');

//Consultation notes functions
//add consultation note
exports.addConsultation = async(req, res) =>{
    const cnsltn = new ConsultationNote(req.body);
    await cnsltn.save()
    res.send(cnsltn);
};

//update consultation note
exports.updateConsultation = async(req, res) =>{
    const cnsltn = await ConsultationNote.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.send(cnsltn);
};

// Combined function to get consultations by appointmentId, doctorId, patientId, or all consultations
exports.getConsultations = async (req, res) => {
    try {
        const { appointmentId, doctorId, patientId } = req.query;
        let filter = {};
        
        // Build filter based on provided parameters
        if (appointmentId) filter.appointmentId = appointmentId;
        if (doctorId) filter.doctorId = doctorId;
        if (patientId) filter.patientId = patientId;
        
        // If no filters provided, return all consultations
        const consultations = await ConsultationNote.find(filter)
            .populate('appointmentId')
            .populate('doctorId')
            .populate('patientId')
            .sort({ createdAt: -1 }); // Sort by newest first
            
        res.json({
            success: true,
            count: consultations.length,
            data: consultations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching consultations',
            error: err.message
        });
    }
};

/******************************************************************************************************/

//Medicine Prescription functions
//add medPrescription
exports.addmedPrescription = async(req, res) =>{
    const medpresc = new MedicinePresc(req.body);
    await medpresc.save()
    res.send(medpresc);
};

//update medPrescription
exports.updatemedPrescription = async(req, res) =>{
    const medpresc = await MedicinePresc.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.send(medpresc);
};

// Combined function to get medicine prescriptions by appointmentId, patientId, or all prescriptions
exports.getMedPrescriptions = async (req, res) => {
    try {
        const { appointmentId, patientId } = req.query;
        let filter = {};
        
        // Build filter based on provided parameters
        if (appointmentId) filter.appointmentId = appointmentId;
        if (patientId) filter.patientId = patientId;
        
        // If no filters provided, return all medicine prescriptions
        const medPrescriptions = await MedicinePresc.find(filter)
            .populate('appointmentId')
            .populate('patientId')
            .sort({ createdAt: -1 }); // Sort by newest first
            
        res.json({
            success: true,
            count: medPrescriptions.length,
            data: medPrescriptions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medicine prescriptions',
            error: err.message
        });
    }
};


/******************************************************************************************************/

//LabTest Prescription functions
//add TestPrescription
exports.addlabPrescription = async(req, res) =>{
    const labtestpresc = new LabtestPresc(req.body);
    await labtestpresc.save()
    res.send(labtestpresc);
};

//update TestPrescription
exports.updatelabPrescription = async(req, res) =>{
    const labtestpresc = await LabtestPresc.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.send(labtestpresc);
};

// Combined function to get test prescriptions by appointmentId, patientId, or all prescriptions
exports.getTestPrescriptions = async (req, res) => {
    try {
        const { appointmentId, patientId } = req.query;
        let filter = {};
        
        // Build filter based on provided parameters
        if (appointmentId) filter.appointmentId = appointmentId;
        if (patientId) filter.patientId = patientId;
        
        // If no filters provided, return all test prescriptions
        const testPrescriptions = await LabtestPresc.find(filter)
            .populate('appointmentId')
            .populate('patientId')
            .sort({ createdAt: -1 }); // Sort by newest first
            
        res.json({
            success: true,
            count: testPrescriptions.length,
            data: testPrescriptions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching test prescriptions',
            error: err.message
        });
    }
};

/******************************************************************************************************/

//Consultation History functions
//get comprehensive consultation history by appointmentID, doctorID, patientID, or all consultations
exports.getConsultationHistory = async (req, res) => {
    try {
        const { appointmentId, doctorId, patientId } = req.query;
        let filter = {};
        
        // Build filter based on provided parameters
        if (appointmentId) filter.appointmentId = appointmentId;
        if (doctorId) filter.doctorId = doctorId;
        if (patientId) filter.patientId = patientId;

        // Get consultation notes
        const consultations = await ConsultationNote.find(filter)
            .populate('appointmentId')
            .populate('doctorId')
            .populate('patientId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: consultations.length,
            data: consultations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching consultation history',
            error: err.message
        });
    }
};

//get comprehensive medicine prescription history by appointmentID or patientID
exports.getMedicinePrescriptionHistory = async (req, res) => {
    try {
        const { appointmentId, patientId } = req.query;
        let filter = {};
        
        // Build filter based on provided parameters
        if (appointmentId) filter.appointmentId = appointmentId;
        if (patientId) filter.patientId = patientId;
        
        // If no filters provided, return all medicine prescriptions
        const medicinePrescriptions = await MedicinePresc.find(filter)
            .populate('appointmentId')
            .populate('patientId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: medicinePrescriptions.length,
            data: medicinePrescriptions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching medicine prescription history',
            error: err.message
        });
    }
};


