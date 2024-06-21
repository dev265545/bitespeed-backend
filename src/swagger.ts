import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Bitspeed Backend",
    version: "1.0.0",
    description: "Documentation for Identification Api Bitspeed",
  },
  servers: [
    {
      url: "http://localhost:5000", // Replace with your actual API base URL
      description: "Development server",
    },
    {
      url: "https://bitespeed-backend-ern2.onrender.com",
      description: "Production Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Path to the API routes folder
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
