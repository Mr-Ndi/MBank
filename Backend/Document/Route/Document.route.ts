import express from "express";
import { uploadDocument } from "../Controllers/Document.controller.js";
import multer from "multer";
import SharedMiddleware from "../../utils/middleware.shared.js";
import DocumentSchemas from "../Schemas/Document.schema.js";


const documentRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

documentRouter.post("/upload", upload.single("file"), SharedMiddleware.validateBody(DocumentSchemas.documentSchema), SharedMiddleware.uploadToCloudinary('file', '/mbank/ibicupuri'), uploadDocument);
// documentRouter.get("/download", downloadDocument);
// documentRouter.get("/by-department-level", getDocumentsByDepartmentAndLevel);
// documentRouter.get("/documents/by-module", getDocumentsByModule);

export default documentRouter;
