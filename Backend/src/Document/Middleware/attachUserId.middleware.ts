import { Request, Response, NextFunction } from "express";
import AuthRepository from "../../Auth/Repository/Auth.repo.js";
import { AppError } from "../../utils/error.js";

export default class DocumentMiddleware {
  static attachUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authUser = req.user;
      if (!authUser?.id) {
        return next(new AppError("User not authenticated", 401));
      }

      // Ensure user exists in DB
      const existing = await AuthRepository.findUserById(String(authUser.id));
      if (!existing) {
        return next(new AppError("User does not exist", 401));
      }

      // Attach userId to body for downstream service/repo
      req.body.userId = String(authUser.id);
      next();
    } catch (err) {
      return next(new AppError("Failed to process user information", 500));
    }
  };
}
