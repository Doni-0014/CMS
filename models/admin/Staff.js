const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  staffId: { type: String, unique: true },
  active: { type: Boolean, default: true }
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
