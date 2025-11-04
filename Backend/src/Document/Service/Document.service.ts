import DocumentRepo from "../Repository/Document.repo.js";
import { google } from "googleapis";
import fs from "fs";
import mime from "mime-types";
import dotenv from "dotenv";
import { DocUploadInterface } from "../Interface/Document.interface.js";
import { AppError } from "../../utils/error.js";
dotenv.config();
export default class DocumentService {
    /**
     * Upload a document to Google Drive and save the URL in the database.
     */
    static async uploadDocument(inputs: DocUploadInterface): Promise<any> {
        try {
            const result = await DocumentRepo.saveDocument(inputs);
            return result;
        } catch (error: any) {
            console.error(`Error uploading document: ${error.message}`);
            throw new Error("Failed to upload document.");
        }
    }

    static async getDocuments(query: any): Promise<any[]> {
        return await DocumentRepo.getDocuments(query);
    }

    static async updateDocument(id: string, updates: Partial<DocUploadInterface>): Promise<any> {
        try {
            const updatedDocument = await DocumentRepo.updateDocument(id, updates);
            return updatedDocument;
        } catch (error: any) {
            throw new Error("Failed to update document.");
        }
    }

    static async approveDocument(id: string): Promise<any> {
        try {
            const exists = await DocumentRepo.findDocumentById(id);
            if (!exists) {
                throw new AppError("Document not found.", 404);
            }
            const approved = await DocumentRepo.approveDocument(id);
            return approved;
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError("Failed to approve document.", 500);
        }
    }


//     /**
//      * Get the file download URL.
//      */
//     async downloadDocument(url: string): Promise<any> {
//         try {
//             return { downloadUrl: url };
//         } catch (error: any) {
//             console.error(`Error downloading document: ${error.message}`);
//             throw new Error("Failed to download document.");
//         }
//     }

//     /**
//      * Get documents by department and level.
//      */
//     async getDocumentsByDepartmentAndLevel(department: string, level: number) {
//         try {
//             return await documentModel.getDocumentsByDepartmentAndLevel(department, level);
//         } catch (error: any) {
//             console.error(`Error fetching documents: ${error.message}`);
//             throw new Error("Failed to fetch documents.");
//         }
//     }

//     /**
//      * Get documents by module.
//      */
//     async getDocumentsByModule(module: string) {
//         try {
//             return await documentModel.getDocumentsByModule(module);
//         } catch (error: any) {
//             console.error(`Error fetching documents: ${error.message}`);
//             throw new Error("Failed to fetch documents.");
//         }
//     }

//     /**
//      * Reporting a document.
//      */
//     async reportDocument(
//         documentId: number,
//         studentId: number,
//         reason: string
//     ): Promise<any>{
//         try {
//             // Check if document exists
//             const document = await documentModel.findDocumentById(documentId);
//             if (!document) {
//                 throw new Error("Document not found.");
//             }
    
//             // Validate report reason
//             const validReasons = ["INAPPROPRIATE", "DUPLICATE", "COPYRIGHT", "OTHER"];
//             if (!validReasons.includes(reason.toUpperCase())) {
//                 throw new Error("Invalid report reason.");
//             }
    
//             // Save the new report
//             await documentModel.createReport(documentId, studentId, reason.toUpperCase());
    
//             // Increment report count in the document
//             await documentModel.incrementReportCount(documentId);
    
//             return { message: "Document reported successfully." };
//         } catch (error: any) {
//             console.error(`Error reporting document: ${error.message}`);
//             throw new Error("Failed to report document.");
//         }
//     }
}
