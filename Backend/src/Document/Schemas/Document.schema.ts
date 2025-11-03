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
    // userId is attached server-side from the authenticated user; do not require it from clients
    userId: Joi.string().uuid().optional().allow(null),
  });

  static documentQuerySchema = Joi.object({
    school: Joi.string().trim().optional(),
    moduleCode: Joi.string().trim().optional(),
    department: Joi.string().trim().optional(),
    level: Joi.number().integer().min(1).max(10).optional(),
    moduleName: Joi.string().trim().optional(),
    category: Joi.string()
      .valid(...Object.values(DocumentCategory))
      .optional(),
  }).unknown(false); 

  static documentUpdateSchema = Joi.object({
    school: Joi.string().trim().optional(),
    moduleCode: Joi.string().trim().optional(),
    department: Joi.string().trim().optional(),
    level: Joi.number().integer().min(1).max(10).optional(),
    moduleName: Joi.string().trim().optional(),
    date: Joi.date().iso().optional(),
    userId: Joi.string().uuid().optional().allow(null),
    category: Joi.string()
        .valid(...Object.values(DocumentCategory))
        .optional(), 
  }).min(1).unknown(false);
}

