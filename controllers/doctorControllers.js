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

// Combined function to get consultations by appointmentId or doctorId
exports.getConsultations = async (req, res) => {
    try {
        const { appointmentId, doctorId } = req.query;
        let filter = {};
        if (appointmentId) filter.appointmentId = appointmentId;
        if (doctorId) filter.doctorId = doctorId;
        if (!appointmentId && !doctorId) {
            return res.status(400).json({ message: 'Please provide either appointmentId or doctorId as a query parameter.' });
        }
        const consultations = await ConsultationNote.find(filter)
            .populate('appointmentId')
            .populate('doctorId');
        res.send(consultations);
    } catch (err) {
        res.status(500).json({
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

// Combined function to get medicine prescriptions by appointmentId or patientId
exports.getMedPrescriptions = async (req, res) => {
    try {
        const { appointmentId, patientId } = req.query;
        let filter = {};
        if (appointmentId) filter.appointmentId = appointmentId;
        if (patientId) filter.patientId = patientId;
        if (!appointmentId && !patientId) {
            return res.status(400).json({ message: 'Please provide either appointmentId or patientId as a query parameter.' });
        }
        const medPrescriptions = await MedicinePresc.find(filter)
            .populate('appointmentId')
            .populate('patientId');
        res.send(medPrescriptions);
    } catch (err) {
        res.status(500).json({
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

// Combined function to get test prescriptions by appointmentId or patientId
exports.getTestPrescriptions = async (req, res) => {
    try {
        const { appointmentId, patientId } = req.query;
        let filter = {};
        if (appointmentId) filter.appointmentId = appointmentId;
        if (patientId) filter.patientId = patientId;
        if (!appointmentId && !patientId) {
            return res.status(400).json({ message: 'Please provide either appointmentId or patientId as a query parameter.' });
        }
        const testPrescriptions = await LabtestPresc.find(filter)
            .populate('appointmentId')
            .populate('patientId');
        res.send(testPrescriptions);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching test prescriptions',
            error: err.message
        });
    }
};

/******************************************************************************************************/

//Consultation History functions
//get comprehensive consultation history by appointmentID, doctorID, or patientID
exports.getConsultationHistory = async (req, res) => {
    try {
        const { appointmentId, doctorId, patientId } = req.query;
        
        if (!appointmentId && !doctorId && !patientId) {
            return res.status(400).json({ 
                message: 'Please provide either appointmentId, doctorId, or patientId as a query parameter.' 
            });
        }

        let filter = {};
        if (appointmentId) filter.appointmentId = appointmentId;
        if (doctorId) filter.doctorId = doctorId;
        if (patientId) filter.patientId = patientId;

        // Get consultation notes
        const consultations = await ConsultationNote.find(filter)
            .populate('appointmentId')
            .populate('doctorId')
            .populate('patientId')
            .sort({ createdAt: -1 });

        const consultationHistory = {
            consultations: consultations,
            summary: {
                totalConsultations: consultations.length
            }
        };

        res.json(consultationHistory);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching consultation history',
            error: err.message
        });
    }
};

//get comprehensive medicine prescription history by appointmentID, doctorID, or patientID
exports.getMedicinePrescriptionHistory = async (req, res) => {
    try {
        const { appointmentId, doctorId, patientId } = req.query;
        
        if (!appointmentId && !doctorId && !patientId) {
            return res.status(400).json({ 
                message: 'Please provide either appointmentId, doctorId, or patientId as a query parameter.' 
            });
        }

        let filter = {};
        if (appointmentId) filter.appointmentId = appointmentId;
        if (doctorId) filter.doctorId = doctorId;
        if (patientId) filter.patientId = patientId;

        // Get medicine prescriptions
        const medicinePrescriptions = await MedicinePresc.find(filter)
            .populate('appointmentId')
            .populate('patientId')
            .sort({ createdAt: -1 });

        const medicinePrescriptionHistory = {
            medicinePrescriptions: medicinePrescriptions,
            summary: {
                totalMedicinePrescriptions: medicinePrescriptions.length
            }
        };

        res.json(medicinePrescriptionHistory);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching medicine prescription history',
            error: err.message
        });
    }
};


