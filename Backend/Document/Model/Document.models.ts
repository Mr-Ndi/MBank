import { PrismaClient } from "@prisma/client";
import { DocumentCategory } from '@prisma/client';

const prisma = new PrismaClient();

export class DocumentModel {
  /**
     * Save a document's metadata to the database.
     */
  async saveDocument(
    school: string,
    fieldId: string,
    department: string,
    level: number,
    module: string,
    category: string,
    url: string,
    studentId: number
  ) {
    try {
      if (!Object.values(DocumentCategory).includes(category as DocumentCategory)) {
        throw new Error(`Invalid category value: ${category}. Must be one of: ${Object.values(DocumentCategory).join(", ")}`);
      }
  
      return await prisma.document.create({
        data: {
          school,
          fieldId,
          Department: department,
          level,
          module,
          date: new Date(),
          category: category as DocumentCategory,
          url,
          studentId,
        },
      });
    } catch (error: any) {
      console.error(`Error saving document: ${error.message}`);
      throw new Error("Failed to save document.");
    }
  }
  
  /**
    * Retrieve documents by department and level.
    */
  async getDocumentsByDepartmentAndLevel(department: string, level: number) {
      try {
          return await prisma.document.findMany({
              where: {
                  Department: department,
                  level,
              },
          });
      } catch (error: any) {
          console.error(`Error fetching documents: ${error.message}`);
          throw new Error("Failed to retrieve documents.");
      } finally {
          await prisma.$disconnect();
      }
  }

  /**
   * Retrieve documents by module name.
   */
  async getDocumentsByModule(module: string) {
      try {
          return await prisma.document.findMany({
              where: {
                  module,
              },
          });
      } catch (error: any) {
          console.error(`Error fetching documents: ${error.message}`);
          throw new Error("Failed to retrieve documents.");
      } finally {
          await prisma.$disconnect();
      }
  }
}
