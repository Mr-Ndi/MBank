import { DocumentModel } from "../Model/Document.models";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import fs from "fs";

const documentModel = new DocumentModel();
const prisma = new PrismaClient();
const auth = new google.auth.GoogleAuth({
    keyFile: "path/to/your-service-account-key.json",     scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

export class DocumentService {
    /**
     * Upload a document to Google Drive and save metadata to the database.
     */
    async uploadDocument(
        filePath: string,
        fileName: string,
        school: string,
        fieldId: string,
        department: string,
        level: number,
        module: string,
        category: string,
        studentId: number
    ): Promise<any> {
        try {
                             const fileMetadata = { name: fileName };                 const media = { mimeType: "image/jpeg", body: fs.createReadStream(filePath) };     
                const response = await drive.files.create({
                    requestBody: fileMetadata,                     media: media,                                   fields: "id",                               });
    
                const fileId = response.data.id;
    
                                if (!fileId) {
                    throw new Error("Failed to upload file. No file ID returned.");
                }
    
                                await drive.permissions.create({
                    fileId: fileId,                     requestBody: {
                        role: "reader",                         type: "anyone",
                    },
                });
    
                const file = await drive.files.get({
                    fileId: fileId,
                    fields: "webViewLink, webContentLink",                 });
    
                const fileUrl = file.data.webContentLink;
    
                                if (!fileUrl) {
                    throw new Error("Failed to retrieve file URL.");
                }
    
                                return await documentModel.saveDocument(
                    school,
                    fieldId,
                    department,
                    level,
                    module,
                    category,
                    fileUrl,                     studentId
                );
            } catch (error: any) {
                console.error(`Error uploading document: ${error.message}`);
                throw new Error("Failed to upload document.");
        }
    }
    /**
     * Download a document using its URL.
     */
    async downloadDocument(url: string): Promise<any> {
        try {
                        return { downloadUrl: url };
        } catch (error: any) {
            console.error(`Error downloading document: ${error.message}`);
            throw new Error("Failed to download document.");
        }
    }

    /**
     * Get documents by department and level.
     */
    async getDocumentsByDepartmentAndLevel(department: string, level: number) {
        try {
            return await documentModel.getDocumentsByDepartmentAndLevel(department, level);
        } catch (error: any) {
            console.error(`Error fetching documents: ${error.message}`);
            throw new Error("Failed to fetch documents.");
        }
    }

    /**
     * Get documents by module.
     */
    async getDocumentsByModule(module: string) {
        try {
            return await documentModel.getDocumentsByModule(module);
        } catch (error: any) {
            console.error(`Error fetching documents: ${error.message}`);
            throw new Error("Failed to fetch documents.");
        }
    }
}
