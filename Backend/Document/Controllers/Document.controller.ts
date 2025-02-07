import { Request, Response } from "express";
import { DocumentService } from "../Service/Document.service";
import fs from "fs";

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
        return res.status(500).json({ error: "Database error. Please try again later." });
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
        return res.status(500).json({ error: "Database error. Please try again later." });
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

    // Validate input data
    const levelNum = parseInt(level as string, 10);
    const studentIdNum = parseInt(studentId as string, 10);

    if (!school || !fieldId || !department || !module || !category || !isFinite(levelNum) || !isFinite(studentIdNum)) {
        return res.status(400).json({ error: "All fields are required and must be valid." });
    }

    // Validate category
    const validCategories = ["NOTES", "ASSIGNMENTS", "EXAMS", "OTHERS"];
    if (!validCategories.includes(category.toUpperCase())) {
        return res.status(400).json({ error: "Invalid category type." });
    }

    // Validate file type and size
    const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).json({ error: "Invalid file type. Only PDF and Word documents are allowed." });
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return res.status(400).json({ error: "File too large. Max 5MB allowed." });
    }

    try {
        const savedDocument = await documentService.uploadDocument(
            file.path,
            file.originalname,
            school,
            fieldId,
            department,
            levelNum,
            module,
            category,
            studentIdNum
        );
        return res.status(201).json({ message: "Document uploaded successfully", document: savedDocument });
    } catch (error: any) {
        console.error(`Error uploading document: ${error.message}`);
        fs.unlinkSync(file.path); // Delete temp file to save space
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
