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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Provide the JWT as: Bearer <token>",
        },
      },
      schemas: {
        Document: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid", example: "e827d81b-2b08-435f-933f-7873880ca903" },
            school: { type: "string", example: "ICT" },
            moduleCode: { type: "string", example: "CS123" },
            department: { type: "string", example: "CS" },
            level: { type: "integer", example: 3 },
            moduleName: { type: "string", example: "Intro" },
            date: { type: "string", format: "date-time", example: "2025-10-28T00:00:00.000Z" },
            category: { type: "string", enum: ["EXAM", "ASSIGNMENT", "QUIZ", "OTHER", "CAT"], example: "EXAM" },
            url: { type: "string", format: "uri" },
            approved: { type: "boolean", example: false },
            uploadedAt: { type: "string", format: "date-time" },
            userId: { type: "string", format: "uuid", nullable: true },
            reportCount: { type: "integer", example: 0 },
          },
        },
      },
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
