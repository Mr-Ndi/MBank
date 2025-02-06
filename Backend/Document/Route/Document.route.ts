import express from "express";
import { uploadDocument, downloadDocument, getDocumentsByDepartmentAndLevel, getDocumentsByModule } from "../Controllers/Document.controller";
import multer from "multer";


const documentRouter = express.Router();
const upload = multer({ dest: "uploads/" });

documentRouter.post("/documents/upload", upload.single("file"), uploadDocument);
documentRouter.get("/documents/download", downloadDocument);
documentRouter.get("/documents/by-department-level", getDocumentsByDepartmentAndLevel);
documentRouter.get("/documents/by-module", getDocumentsByModule);

export default documentRouter;
