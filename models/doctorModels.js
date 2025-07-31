const mongoose = require('mongoose');
const consultationSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    symptoms: String,
    diagnosis: String,
    Notes: String,
    createdAt: { type: Date, default: Date.now }
});
const ConsultationNote = mongoose.model('consultation', consultationSchema);


const medicinePrescription = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    medicines: String,
    description: String
})
const MedicinePresc = mongoose.model('medicine', medicinePrescription);


const labtestPrescription = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    labtests: String,
    description: String
})
const LabtestPresc = mongoose.model('labtest', labtestPrescription);

module.exports = {ConsultationNote, MedicinePresc, LabtestPresc};


