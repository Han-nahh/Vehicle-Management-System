// routes/vehicleRoutes.js
const express = require('express');
const { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } = require('../Controllers/vehicleController');
const router = express.Router();


// Vehicle CRUD
router.post('/', createVehicle); 
router.get('/', getVehicles);   
router.get('/:id', getVehicleById); 
router.put('/:id', updateVehicle); 
router.delete('/:id', deleteVehicle); 

module.exports = router;
