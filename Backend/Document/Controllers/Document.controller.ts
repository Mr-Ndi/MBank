import { Request, Response } from "express";
import { DocumentService } from "../Service/Document.servive";

const documentService = new DocumentService();

/**
 * Get documents by department and level.
 */
export const getDocumentsByDepartmentAndLevel = async (req: Request, res: Response): Promise<any> => {
    const { department, level } = req.query;

    if (!department || !level) {
        return res.status(400).json({ error: "Department and level are required." });
    }

    try {
        const documents = await documentService.getDocumentsByDepartmentAndLevel(
            department as string,
            parseInt(level as string, 10)
        );

        res.status(200).json({ documents });
    } catch (error: any) {
        console.error(`Error fetching documents: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

/**
 * Get documents by module.
 */

export const getDocumentsByModule = async (req: Request, res: Response): Promise<any> => {
    const { module } = req.query;

    if (!module) {
        return res.status(400).json({ error: "Module name is required." });
    }

    try {
        const documents = await documentService.getDocumentsByModule(module as string);
        res.status(200).json({ documents });
    } catch (error: any) {
        console.error(`Error fetching documents: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
    /**
 * Upload a document.
 */
export const uploadDocument = async (req: Request, res: Response): Promise<any> => {
    const {
        school,
        fieldId,
        department,
        level,
        module,
        category,
        studentId,
    } = req.body;

    const file = req.file; // Assuming file is uploaded using a middleware like multer

    if (!file || !school || !fieldId || !department || !level || !module || !category || !studentId) {
        return res.status(400).json({ error: "All fields and file are required." });
    }

    try {
        const savedDocument = await documentService.uploadDocument(
            file.path,
            file.originalname,
            school,
            fieldId,
            department,
            parseInt(level, 10),
            module,
            category,
            parseInt(studentId, 10)
        );

        res.status(201).json({ message: "Document uploaded successfully", document: savedDocument });
    } catch (error: any) {
        console.error(`Error uploading document: ${error.message}`);
        res.status(500).json({ error: "Failed to upload document." });
    }
};

/**
 * Download a document.
 */
export const downloadDocument = async (req: Request, res: Response): Promise<any> => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Document URL is required." });
    }

    try {
        const { downloadUrl } = await documentService.downloadDocument(url as string);
        res.status(200).json({ downloadUrl });
    } catch (error: any) {
        console.error(`Error downloading document: ${error.message}`);
        res.status(500).json({ error: "Failed to download document." });
    }
}
