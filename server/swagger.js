const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Vehicle Management System API',
    version: '1.0.0',
    description: 'API documentation for managing vehicles',
  },
  servers: [
    {
      url: 'https://vehicle-management-system-be.onrender.com',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./Routes/vehicleRoutes.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
