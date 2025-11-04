import { Request, Response, NextFunction } from "express";
import DocumentService from "../Service/Document.service.js";

export const uploadDocument = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const savedDocument = await DocumentService.uploadDocument(req.body);
        return res.status(201).json({ 
            message: "Document uploaded successfully", 
            data: savedDocument,
            status: "success"
        });
    } catch (error: any) {
        // Delegate to universal error handler
        return next(error);
    }
};

export const getDocuments = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const filters = req.query; // e.g. /document?school=Harvard&category=EXAM
        const documents = await DocumentService.getDocuments(filters);
        return res.status(200).json({
            message: "Documents fetched successfully",
            data: documents,
            status: "success"
        });
    } catch (error) {
        // Delegate to universal error handler
        return next(error);
    }
};

export const updateDocument = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedDocument = await DocumentService.updateDocument(id, updates);
        return res.status(200).json({
            message: "Document updated successfully",
            data: [updatedDocument],
            status: "success"
        });
    } catch (error: any) {
        return res.status(500).json({ error: "Failed to update document." });
    }
}

export const approveDocument = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { id } = req.params;
        const result = await DocumentService.approveDocument(id);
        return res.status(200).json({
            message: "Document approved successfully",
            data: result,
            status: "success",
        });
    } catch (error) {
        return next(error);
    }
};

// export const getDocumentsByDepartmentAndLevel = async (req: Request, res: Response): Promise<any> => {
//     const { department, level } = req.query;

//     if (!department || !level || isNaN(Number(level))) {
//         return res.status(400).json({ error: "Valid department and level are required." });
//     }

//     try {
//         const documents = await documentService.getDocumentsByDepartmentAndLevel(
//             department as string,
//             Number(level)
//         );
//         return res.status(200).json({ documents });
//     } catch (error: any) {
//         console.error(`Error fetching documents: ${error.message}`);
//         return res.status(500).json({ error: "Database error. Please try again later." });
//     }
// };

// /**
//  * Get documents by module.
//  */
// export const getDocumentsByModule = async (req: Request, res: Response): Promise<any> => {
//     const { module } = req.query;

//     if (!module) {
//         return res.status(400).json({ error: "Module name is required." });
//     }

//     try {
//         const documents = await documentService.getDocumentsByModule(module as string);
//         return res.status(200).json({ documents });
//     } catch (error: any) {
//         console.error(`Error fetching documents: ${error.message}`);
//         return res.status(500).json({ error: "Database error. Please try again later." });
//     }
// };

/**
 * Download a document.
 */
// export const downloadDocument = async (req: Request, res: Response): Promise<any> => {
//     const { url } = req.query;

//     if (!url) {
//         return res.status(400).json({ error: "Document URL is required." });
//     }

//     try {
//         const { downloadUrl } = await documentService.downloadDocument(url as string);
//         return res.status(200).json({ downloadUrl });
//     } catch (error: any) {
//         console.error(`Error downloading document: ${error.message}`);
//         return res.status(500).json({ error: "Failed to download document." });
//     }
// };
