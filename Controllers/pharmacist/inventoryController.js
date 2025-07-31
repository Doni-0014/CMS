const Inventory = require('../../models/pharmacist/Inventory');

exports.addInventory = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.getInventoryByMedicine = async (req, res) => {
  const item = await Inventory.findOne({ medicineId: req.params.medicineId }).populate('medicineId');
  res.json(item);
};

exports.getAllInventory = async (req, res) => {
  const inventory = await Inventory.find().populate('medicineId');
  res.json(inventory);
};

exports.flagLowStock = async (req, res) => {
  const item = await Inventory.findByIdAndUpdate(req.params.id, { lowStockFlag: true }, { new: true });
  res.json(item);
};
