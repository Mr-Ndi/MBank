// Kibamba.controller.ts - Handles reported document actions
import { Request, Response } from "express";
import { DocumentModel } from "../../Document/Model/Document.models";

const documentModel = new DocumentModel();

/**
 * Get all reported documents sorted by most reported.
 */
export const getReportedDocuments = async (req: Request, res: Response): Promise<any> => {
    try {
        const reportedDocuments = await documentModel.getReportedDocuments();
        return res.status(200).json({ reportedDocuments });
    } catch (error: any) {
        console.error(`Error fetching reported documents: ${error.message}`);
        return res.status(500).json({ error: "Failed to fetch reported documents." });
    }
};
/**
 * Delete a reported document.
 */
export const deleteReportedDocument = async (req: Request, res: Response): Promise<any> => {
    const { documentId } = req.params;

    if (!documentId || isNaN(Number(documentId))) {
        return res.status(400).json({ error: "Valid document ID is required." });
    }

    try {
        const response = await documentModel.deleteReportedDocument(Number(documentId));
        return res.status(200).json(response);
    } catch (error: any) {
        console.error(`Error deleting document: ${error.message}`);
        return res.status(500).json({ error: "Failed to delete document." });
    }
};