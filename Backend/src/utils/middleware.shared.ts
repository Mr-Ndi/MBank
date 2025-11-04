import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";
import { AppError } from "./error.js";

export  default class SharedMiddleware {
    /**
     * Generic middleware to validate req.body against a Joi schema.
    */
    static validateBody = (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

       if (error) {
        const errors = error.details.map((d) => {
          // Remove quotes and backslashes, capitalize first letter
          const msg = d.message.replace(/["\\]/g, "");
          return msg.charAt(0).toUpperCase() + msg.slice(1);
        });


        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors,
        });
        return;
      }

      // Replace req.body with sanitized value
      req.body = value;
      next();
    };

    static uploadToCloudinary = (fieldName: string, folder = "uploads") =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
        const file = req.file;

        if (!file) {
            res.status(400).json({
            status: "error",
            message:'File is required',
            errors: [" `File (${fieldName}) is required`"]
            });
            return;
        }

        const buffer = file.buffer;

        // Function to upload buffer to Cloudinary using a stream
        const uploadStream = () =>
            new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                if (error) reject(error);
                else if (result?.secure_url) resolve(result.secure_url);
                else reject(new Error("Cloudinary upload failed"));
                }
            );
            streamifier.createReadStream(buffer).pipe(stream);
            });

        const fileUrl = await uploadStream();

        // Attach URL to request body
        req.body["url"] = fileUrl;

        next();
        } catch (err: any) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: err.message || "Cloudinary upload failed",
        });
        }
    };

    static validateQuery = (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      const { error, value } = schema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((d) => {
          const msg = d.message.replace(/["\\]/g, "");
          return msg.charAt(0).toUpperCase() + msg.slice(1);
        });

        // Delegate to universal error handler with combined message
        return next(new AppError(`Invalid query parameters: ${errors.join("; ")}`, 400));
      }

      // Replace req.query with sanitized value
      req.query = value;
      next();
    };

    static validateParams = (schema: ObjectSchema) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      const { error, value } = schema.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((d) => {
          const msg = d.message.replace(/["\\]/g, "");
          return msg.charAt(0).toUpperCase() + msg.slice(1);
        });

        return next(new AppError(`Invalid path parameters: ${errors.join("; ")}`, 400));
      }

      req.params = value as any;
      next();
    };

}
