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
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    medicines: String,
    description: String
})
const MedicinePresc = mongoose.model('medicine', medicinePrescription);


const labtestPrescription = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    labtests: String,
    description: String
})
const LabtestPresc = mongoose.model('labtest', labtestPrescription);

module.exports = {ConsultationNote, MedicinePresc, LabtestPresc};


