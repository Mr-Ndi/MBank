import express from "express";
import { uploadDocument, downloadDocument, getDocumentsByDepartmentAndLevel, getDocumentsByModule } from "../Controllers/Document.controller";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/documents/upload", upload.single("file"), uploadDocument);
router.get("/documents/download", downloadDocument);
router.get("/documents/by-department-level", getDocumentsByDepartmentAndLevel);
router.get("/documents/by-module", getDocumentsByModule);

export default router;
