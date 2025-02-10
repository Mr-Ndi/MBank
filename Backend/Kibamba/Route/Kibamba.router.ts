import express from "express";
import { getReportedDocuments, deleteReportedDocument } from "../Controller/Kibamba.controllers";

const AdminRouter = express.Router();

AdminRouter.get("/reported", getReportedDocuments);
AdminRouter.delete("/reported/:documentId", deleteReportedDocument);

export default AdminRouter;