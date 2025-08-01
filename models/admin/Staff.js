const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: { 
    type: String, 
    required: true,
    trim: true
  },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  gender: { 
    type: String, 
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  role: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role', 
    required: true 
  },
  staffId: { 
    type: String, 
    unique: true 
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'India' }
  },
  emergencyContact: {
    name: { type: String, trim: true },
    relationship: { type: String, trim: true },
    phone: { type: String, trim: true }
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  hireDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save hook to auto-generate staffId in the format ST01, ST02, etc.
staffSchema.pre('save', async function (next) {
  if (this.isNew && !this.staffId) {
    const Staff = this.constructor;
    const lastStaff = await Staff.findOne({}, {}, { sort: { staffId: -1 } });
    let nextNumber = 1;
    if (lastStaff && lastStaff.staffId) {
      const match = lastStaff.staffId.match(/ST(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    this.staffId = 'ST' + String(nextNumber).padStart(2, '0');
  }
  next();
});

module.exports = mongoose.model('Staff', staffSchema);
