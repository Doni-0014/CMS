const Medicine = require('../../models/pharmacist/Medicine');

exports.createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
};

exports.updateMedicine = async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(medicine);
};

exports.deactivateMedicine = async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  res.json(medicine);
};
