const express =require("express");
const cors = require("cors");

const db =require('./db')
const app=express()
const allowedOrigins = ["https://vehicle-management-system-102-h90biv2bl.vercel.app/","https://localhost:3000"];
app.use(cors({ origin: allowedOrigins }));

// app.use(cors());
app.use(express.json()); 
const port =5000;
const vehicleRoutes = require('./Routes/vehicleRoutes');

app.get('/', (req, res) => {
    res.send('Vehicle Management System API');
  });
app.use('/api/vehicles', vehicleRoutes);
app.listen(port,()=>console.log(`Port running on ${port}`))