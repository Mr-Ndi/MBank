import express from "express";
import { getDocuments, uploadDocument } from "../Controllers/Document.controller.js";
import multer from "multer";
import SharedMiddleware from "../../utils/middleware.shared.js";
import DocumentSchemas from "../Schemas/Document.schema.js";


const documentRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /document/upload:
 *   post:
 *     summary: Upload a document
 *     description: >
 *       Uploads a document file along with metadata such as school, module, department, and category.
 *       The file will be uploaded to Cloudinary and stored in your database.
 *     tags:
 *       - Documents
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - school
 *               - moduleCode
 *               - department
 *               - level
 *               - moduleName
 *               - date
 *               - category
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The document file to upload (e.g. PDF, DOCX, etc.)
 *               school:
 *                 type: string
 *                 example: "Harvard University"
 *               moduleCode:
 *                 type: string
 *                 example: "CS101"
 *               department:
 *                 type: string
 *                 example: "Computer Science"
 *               level:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 3
 *               moduleName:
 *                 type: string
 *                 example: "Introduction to Programming"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-28"
 *               category:
 *                 type: string
 *                 enum: [EXAM, ASSIGNMENT, QUIZ, OTHER, CAT]
 *                 example: "EXAM"
 *               studentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document uploaded successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     fileUrl:
 *                       type: string
 *                       example: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/mbank/ibicupuri/file.pdf"
 *       400:
 *         description: Invalid request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed. Missing required fields."
 *       500:
 *         description: Server error while uploading document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to upload document."
 */

documentRouter.post("/upload", upload.single("file"), SharedMiddleware.validateBody(DocumentSchemas.documentSchema), SharedMiddleware.uploadToCloudinary('file', '/mbank/ibicupuri'), uploadDocument);
documentRouter.get("/", SharedMiddleware.validateQuery(DocumentSchemas.documentQuerySchema), getDocuments);

// documentRouter.get("/download", downloadDocument);
// documentRouter.get("/by-department-level", getDocumentsByDepartmentAndLevel);
// documentRouter.get("/documents/by-module", getDocumentsByModule);

export default documentRouter;
