import express from "express";
import { getReportedDocuments, deleteReportedDocument } from "../Controller/Kibamba.controllers";

const router = express.Router();

router.get("/reported", getReportedDocuments);
router.delete("/reported/:documentId", deleteReportedDocument);

export default router;