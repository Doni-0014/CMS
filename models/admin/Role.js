const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: { type: Boolean }
});

module.exports = mongoose.model('Role', roleSchema);
