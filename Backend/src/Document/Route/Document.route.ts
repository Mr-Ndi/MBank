import express from "express";
import {
	getDocuments,
	updateDocument,
	uploadDocument,
	approveDocument,
	reportDocument} from "../Controllers/Document.controller.js";
import multer from "multer";
import SharedMiddleware from "../../utils/middleware.shared.js";
import AuthMiddleware from "../../Auth/Middleware/auth.middleware.js";
import DocumentMiddleware from "../Middleware/attachUserId.middleware.js";
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
 *     security:
 *       - bearerAuth: []
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
 *             description: "userId is attached automatically from the authenticated user; do not include it here."
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Document uploaded successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Document'
 *       401:
 *         description: Unauthorized (missing or invalid token)
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
 *                   example: "Unauthorized"
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

documentRouter.post(
	"/upload",
	AuthMiddleware.authenticate,
	upload.single("file"),
	SharedMiddleware.validateBody(DocumentSchemas.documentSchema),
	SharedMiddleware.uploadToCloudinary('file', '/mbank/ibicupuri'),
		DocumentMiddleware.attachUserId,
	uploadDocument
);

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
 *                     $ref: '#/components/schemas/Document'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error while fetching documents
 * 
 * 
 * /document/{id}/report:
 *   post:
 *     summary: Report a problem with a document
 *     description: Authenticated users can report a document for reasons like inappropriate content, duplicate, or copyright issues.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the document to report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *             properties:
 *               reason:
 *                 type: string
 *                 enum: [INAPPROPRIATE, DUPLICATE, COPYRIGHT, OTHER]
 *                 example: INAPPROPRIATE
 *     responses:
 *       201:
 *         description: Report created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 *       500:
 *         description: Server error while reporting document
 */

documentRouter.post(
  "/:id/report",
  AuthMiddleware.authenticate,
  SharedMiddleware.validateParams(DocumentSchemas.documentIdParamSchema),
  SharedMiddleware.validateBody(DocumentSchemas.reportSchema),
  reportDocument
);

// (Old swagger doc snippet removed; see the updated GET /document swagger block above.)

documentRouter.get("/", SharedMiddleware.validateQuery(DocumentSchemas.documentQuerySchema), getDocuments);

/**
 * @swagger
 * /document/{id}:
 *   put:
 *     summary: Update a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the document to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               school:
 *                 type: string
 *               moduleCode:
 *                 type: string
 *               moduleName:
 *                 type: string
 *               department:
 *                 type: string
 *               level:
 *                 type: string
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Failed to update document
 */

documentRouter.put(
	"/:id",
	AuthMiddleware.authenticate,
	AuthMiddleware.requireRoles('ADMIN'),
	SharedMiddleware.validateBody(DocumentSchemas.documentUpdateSchema),
	updateDocument
);

/**
 * @swagger
 * /document/{id}/approve:
 *   patch:
 *     summary: Approve a document
 *     description: Marks the document as approved. Only authenticated users can perform this action.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the document to approve
 *     responses:
 *       200:
 *         description: Document approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Document approved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Document'
 *       400:
 *         description: Invalid path parameters
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 *       500:
 *         description: Failed to approve document
 */

documentRouter.patch(
	"/:id/approve",
	AuthMiddleware.authenticate,
	AuthMiddleware.requireRoles('ADMIN'),
	SharedMiddleware.validateParams(DocumentSchemas.documentIdParamSchema),
	approveDocument
);
export default documentRouter;
