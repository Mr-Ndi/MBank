import { DocumentCategory } from "../Schemas/Document.schema.js";

export interface DocUploadInterface {
  school: string;
    moduleCode: string;
    department: string;
    level: number; // integer between 1–10
    moduleName: string;
    date: string; // ISO 8601 formatted date string (e.g., "2025-10-28T14:30:00Z")
    category: DocumentCategory;
    userId?: number | null;
    url: string;
}