import { Request, Response, NextFunction } from "express";
import AuthRepository from "../../Auth/Repository/Auth.repo.js";

export default class DocumentMiddleware {
  static attachUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authUser = req.user;
      if (!authUser?.id) {
        res.status(401).json({
          status: "error",
          message: "Unauthorized",
          errors: ["User not authenticated"],
        });
        return;
      }

      // Ensure user exists in DB
      const existing = await AuthRepository.findUserById(String(authUser.id));
      if (!existing) {
        res.status(401).json({
          status: "error",
          message: "Unauthorized",
          errors: ["User does not exist"],
        });
        return;
      }

      // Attach userId to body for downstream service/repo
      req.body.userId = String(authUser.id);
      next();
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to process user information",
      });
    }
  };
}
