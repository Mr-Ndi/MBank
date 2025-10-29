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

/**
 * @swagger
 * /document:
 *   get:
 *     summary: Retrieve documents
 *     description: >
 *       Fetch documents from the database with optional filters.  
 *       You can filter by any field such as `school`, `moduleCode`, `department`, `category`, `level`.
 *     tags:
 *       - Documents
 *     parameters:
 *       - name: school
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by school name
 *         example: "ICT"
 *       - name: moduleCode
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by module code
 *         example: "CS123"
 *       - name: department
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by department name
 *         example: "CS"
 *       - name: level
 *         in: query
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: Filter by academic level
 *         example: 3
 *       - name: moduleName
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter by module name
 *         example: "Introduction to Programming"
 *       - name: date
 *         in: query
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by document date
 *         example: "2025-10-28"
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *           enum: [EXAM, ASSIGNMENT, QUIZ, CAT, OTHER]
 *         description: Filter by document category
 *         example: "ASSIGNMENT"
 *     responses:
 *       200:
 *         description: Documents fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Documents fetched successfully"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       school:
 *                         type: string
 *                         example: "ICT"
 *                       moduleCode:
 *                         type: string
 *                         example: "CS123"
 *                       department:
 *                         type: string
 *                         example: "CS"
 *                       level:
 *                         type: integer
 *                         example: 3
 *                       moduleName:
 *                         type: string
 *                         example: "Intro"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-28T00:00:00.000Z"
 *                       category:
 *                         type: string
 *                         enum: [EXAM, ASSIGNMENT, QUIZ, CAT, OTHER]
 *                         example: "ASSIGNMENT"
 *                       url:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/daxuxhhxr/image/upload/v1761673010/mbank/ibicupuri/wlecur6bsnvuhgoofgyc.png"
 *                       approved:
 *                         type: boolean
 *                         example: false
 *                       uploadedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-28T17:36:53.084Z"
 *                       studentId:
 *                         type: integer
 *                         nullable: true
 *                         example: null
 *                       reportCount:
 *                         type: integer
 *                         example: 0
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid query parameters"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Level must be a number"
 *       500:
 *         description: Server error while fetching documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch documents."
 */

documentRouter.get("/", SharedMiddleware.validateQuery(DocumentSchemas.documentQuerySchema), getDocuments);

// documentRouter.get("/download", downloadDocument);
// documentRouter.get("/by-department-level", getDocumentsByDepartmentAndLevel);
// documentRouter.get("/documents/by-module", getDocumentsByModule);

export default documentRouter;
