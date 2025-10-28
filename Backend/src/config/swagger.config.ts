import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MBank API",
      version: "1.0.0",
      description: "API documentation for the MBank application",
    },
    servers: [
      {
        url: "http://localhost:4000/api", 
        description: "Local development server",
      },
    ],
  },
  apis: [
    "./src/**/*.route.ts",
  ],
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
