const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Staff', staffSchema);
