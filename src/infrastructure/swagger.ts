import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "API for managing projects and tasks",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/presentation/routes/*.ts", "./src/domain/models/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
