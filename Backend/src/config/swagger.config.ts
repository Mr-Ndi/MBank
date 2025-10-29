import swaggerJSDoc, { Options } from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import dotenv from "dotenv";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

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
        url: "http://localhost:4000", 
        description: "Local development server",
      },
    ],
  },
  apis: [
    nodeEnv === 'production' ? "./dist/**/*.route.js" : "./src/**/*.route.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
