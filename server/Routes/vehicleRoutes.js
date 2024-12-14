const express = require('express');
const { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } = require('../Controllers/vehicleController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: The vehicles managing API
 */

/**
 * @swagger
 * /api/vehicles:
 *   post:
 *     tags: [Vehicles]
 *     description: Create a new vehicle with Status - Active, Under Maintenance, Inactive
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleName
 *               - status
 *             properties:
 *               vehicleName:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - Under Maintenance
 *                   - Inactive
 *                 description: The current status of the vehicle
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', createVehicle); 

/**
 * @swagger
 * /api/vehicles:
 *   get:
 *     tags: [Vehicles]
 *     description: Get all vehicles
 *     responses:
 *       200:
 *         description: List of vehicles
 *       500:
 *         description: Internal server error
 */
router.get('/', getVehicles);   

/**
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     tags: [Vehicles]
 *     description: Get a vehicle by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the vehicle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle found
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getVehicleById); 

/**
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     tags: [Vehicles]
 *     description: Update a vehicle by its ID  with Status - Active, Under Maintenance, Inactive
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the vehicle
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicleName:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - Under Maintenance
 *                   - Inactive
 *                 description: The current status of the vehicle
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', updateVehicle); 

/**
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     tags: [Vehicles]
 *     description: Delete a vehicle by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the vehicle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteVehicle); 


module.exports = router;
