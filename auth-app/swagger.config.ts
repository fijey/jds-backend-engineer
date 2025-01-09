import { Options as SwaggerOptions } from "swagger-jsdoc";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description: "API documentation for my Express application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Sesuaikan dengan URL server
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Tentukan path ke file dengan anotasi Swagger
};

export default options;
