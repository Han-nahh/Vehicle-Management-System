const mongoose =require('mongoose');
const Vehicle = require('./models/vehicle');
require('dotenv').config();

async function connectDB() {
    try {
        await mongoose.connect(
            process.env.MONGO_URI, {
                connectTimeoutMS: 30000,
            });
        
        console.log("MongoDb connected successfully");
        addDefaultVehicles();
     
    } catch (error) {
        console.error("Mongo DB connection error", error);
    }
}
async function addDefaultVehicles() {
    const defaultVehicles = [
        { vehicleName: 'Toyota Corolla', status: 'Active' },
        { vehicleName: 'Honda Civic', status: 'Under Maintenance' },
        { vehicleName: 'Ford Focus', status: 'Inactive' },
    ];

    try {
        const vehicleCount = await Vehicle.countDocuments();  

        if (vehicleCount === 0) { 
            await Vehicle.insertMany(defaultVehicles);
            console.log("Default vehicles added successfully");
        } else {
            console.log("Vehicles already exist in the database");
        }
    } catch (error) {
        console.error("Error adding default vehicles", error);
    }
}


connectDB();

module.exports=mongoose