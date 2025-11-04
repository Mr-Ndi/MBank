import DocumentRepo from "../Repository/Document.repo.js";
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
}
