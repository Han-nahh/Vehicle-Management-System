const Vehicle = require('../models/vehicle');

const createVehicle = async (req, res) => {
  const { vehicleName, status } = req.body;

  try {
    const vehicle = new Vehicle({ vehicleName, status });
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getVehicleById = async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { vehicleName, status } = req.body;

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { vehicleName, status, lastUpdated: Date.now() },
      { new: true }
    );
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };