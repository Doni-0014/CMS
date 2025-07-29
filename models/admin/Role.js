const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Role', roleSchema);
