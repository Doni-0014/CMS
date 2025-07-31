const Inventory = require('../../models/pharmacist/Inventory');

exports.addInventory = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Inventory for this medicine already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInventoryByMedicine = async (req, res) => {
  try {
    const item = await Inventory.findOne({ medicineId: req.params.medicineId }).populate('medicineId');
    if (!item) {
      return res.status(404).json({ message: 'Inventory not found for this medicine' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('medicineId');
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.flagLowStock = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, { lowStockFlag: true }, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
