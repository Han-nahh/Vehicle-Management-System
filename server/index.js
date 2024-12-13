const express =require("express");
const cors = require("cors");

const db =require('./db')
const app=express()
app.use(cors());
app.use(express.json()); 
const port =5000;
const vehicleRoutes = require('./Routes/vehicleRoutes');

app.get('/', (req, res) => {
    res.send('Vehicle Management System API');
  });
app.use('/api/vehicles', vehicleRoutes);
app.listen(port,()=>console.log(`Port running on ${port}`))