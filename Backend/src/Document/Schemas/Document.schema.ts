import Joi from "joi";

// Example: make sure these match your Prisma enums
export enum DocumentCategory {
  EXAM = "EXAM",
  ASSIGNMENT = "ASSIGNMENT",
  QUIZ = "QUIZ",
  OTHER = "OTHER",
  CAT="CAT",
}

export default class DocumentSchemas {
    static documentSchema = Joi.object({
      school: Joi.string().trim().required(),
      moduleCode: Joi.string().trim().required(),
      department: Joi.string().trim().required(),
      level: Joi.number().integer().min(1).max(10).required(),
      moduleName: Joi.string().trim().required(),
      date: Joi.date().iso().required(),
      category: Joi.string()
          .valid(...Object.values(DocumentCategory))
          .required(), 
      studentId: Joi.number().integer().positive().optional().allow(null),
    });
}
