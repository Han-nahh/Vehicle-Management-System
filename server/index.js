const express =require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const db =require('./db')
const app=express()

const allowedOrigins = ["https://vhms.netlify.app",  "https://vhsfe-4pqutiacj-hanites69gmailcoms-projects.vercel.app", "http://localhost:3000","http://localhost:5000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json()); 
const port =5000;
const vehicleRoutes = require('./Routes/vehicleRoutes');

app.get('/', (req, res) => {
    res.send('Vehicle Management System API workinf');
  });
app.use('/api/vehicles', vehicleRoutes);
app.listen(port,()=>console.log(`Port running on ${port}`))