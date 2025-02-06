import { Request, Response } from "express";
import { DocumentService } from "../Service/Document.service";

const documentService = new DocumentService();

/**
 * Get documents by department and level.
 */
export const getDocumentsByDepartmentAndLevel = async (req: Request, res: Response): Promise<any> => {
    const { department, level } = req.query;

    if (!department || !level || isNaN(Number(level))) {
        return res.status(400).json({ error: "Valid department and level are required." });
    }

    try {
        const documents = await documentService.getDocumentsByDepartmentAndLevel(
            department as string,
            Number(level)
        );

        return res.status(200).json({ documents });
    } catch (error: any) {
        console.error(`Error fetching documents: ${error.message}`);
        return res.status(500).json({ error: "Failed to fetch documents." });
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
        return res.status(200).json({ documents });
    } catch (error: any) {
        console.error(`Error fetching documents: ${error.message}`);
        return res.status(500).json({ error: "Failed to fetch documents." });
    }
};

/**
 * Upload a document.
 */
export const uploadDocument = async (req: Request, res: Response): Promise<any> => {
    const { school, fieldId, department, level, module, category, studentId } = req.body;
    const file = req.file; // Assuming Multer is used for file handling

    if (!file) {
        return res.status(400).json({ error: "File is required." });
    }

    if (!school || !fieldId || !department || !level || !module || !category || !studentId || isNaN(Number(level)) || isNaN(Number(studentId))) {
        return res.status(400).json({ error: "All fields are required and must be valid." });
    }

    try {
        const savedDocument = await documentService.uploadDocument(
            file.path,
            file.originalname,
            school,
            fieldId,
            department,
            Number(level),
            module,
            category,
            Number(studentId)
        );

        return res.status(201).json({ message: "Document uploaded successfully", document: savedDocument });
    } catch (error: any) {
        console.error(`Error uploading document: ${error.message}`);
        return res.status(500).json({ error: "Failed to upload document." });
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
        return res.status(200).json({ downloadUrl });
    } catch (error: any) {
        console.error(`Error downloading document: ${error.message}`);
        return res.status(500).json({ error: "Failed to download document." });
    }
};
