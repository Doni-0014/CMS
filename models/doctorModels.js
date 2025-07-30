const mongoose = require('mongoose');
const consultationSchema = new mongoose.Schema({
    // appointmentId:{type:mongoose.Schema.Types.ObjectId,ref:'appointment'},
    // doctorId:{type:mongoose.Schema.Types.ObjectId,ref:'doctor'},
    symptoms:String,
    diagnosis:String,
    Notes:String,
    createdAt: {type:Date, default:Date.now}
});
const ConsultationNote = mongoose.model('consultation', consultationSchema);


const medicinePrescription = new mongoose.Schema({
    // appointmentId:{type:mongoose.Schema.Types.ObjectId,ref:'appointment'},
    medicines:String,
    description:String
})
const MedicinePresc = mongoose.model('medicine', medicinePrescription);


const labtestPrescription = new mongoose.Schema({
    // appointmentId:{type:mongoose.Schema.Types.ObjectId,ref:'appointment'},
    labtests:String,
    description:String
})
const LabtestPresc = mongoose.model('labtest', labtestPrescription);

module.exports = {ConsultationNote, MedicinePresc, LabtestPresc};


