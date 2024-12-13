const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'Under Maintenance', 'Inactive'] },
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;