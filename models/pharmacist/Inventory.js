const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true },
  lowStockFlag: { type: Boolean, default: false }
});

module.exports = mongoose.model('Inventory', inventorySchema);
