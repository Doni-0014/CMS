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

//getting consultations (using appointmentID)
exports.getConsultationsByAppointmentID = async(req, res) =>{
        try {
        const appointmentId = req.params.id;
        const cnsltns = await receptionist.find({appointmentId}).populate('appointmentId');
        res.send(cnsltns);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching consultations by appointments',
            error: err.message
        });
    }
};

//getting consultations (using doctorID)
exports.getConsultationsByDoctorID = async(req, res) =>{
        try {
        const doctorId = req.params.id;
        const cnsltns = await receptionist.find({doctorId}).populate('doctorId');
        res.send(cnsltns);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching consultations by doctors',
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

//getting medPrescriptions (using appointmentID)
exports.getmedPrescriptionByAppointmentID = async(req, res) =>{
        try {
        const appointmentId = req.params.id;
        const medprescs = await receptionist.find({appointmentId}).populate('appointmentId');
        res.send(medprescs);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching medPrescriptions by appointments',
            error: err.message
        });
    }
};

//getting medPrescriptions (using patientID)
exports.getmedPrescriptionByPatientID = async(req, res) =>{
        try {
        const patientId = req.params.id;
        const medprescs = await receptionist.find({patientId}).populate('patientId');
        res.send(medprescs);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching medPrescriptions by patients',
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

//getting testPrescriptions (using appointmentID)
exports.gettestPrescriptionByAppointmentID = async(req, res) =>{
        try {
        const appointmentId = req.params.id;
        const labtestprescs = await receptionist.find({appointmentId}).populate('appointmentId');
        res.send(labtestprescs);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching testPrescriptions by appointments',
            error: err.message
        });
    }
};

//getting testPrescriptions (using patientID)
exports.gettestPrescriptionByPatientID = async(req, res) =>{
        try {
        const patientId = req.params.id;
        const labtestprescs = await receptionist.find({patientId}).populate('patientId');
        res.send(labtestprescs);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching testPrescriptions by patients',
            error: err.message
        });
    }
};


