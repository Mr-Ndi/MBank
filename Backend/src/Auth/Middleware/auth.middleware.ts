import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthRepository from '../Repository/Auth.repo.js';
import { UserInterface } from '../Interface/Auth.interface.js';

/**
 * AuthMiddleware
 * Verifies a JWT (from Authorization: Bearer <token>) and attaches the user to req.user
 * Response shape follows the project's convention used in SharedMiddleware
 */
export default class AuthMiddleware {
  static authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization || '';
      if (!authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
          errors: ['Missing or invalid Authorization header'],
        });
        return;
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
          errors: ['Token not provided'],
        });
        return;
      }

      const secret = process.env.JWT_SECRET as string;
      if (!secret) {
        // Misconfiguration guard
        res.status(500).json({
          status: 'error',
          message: 'Server configuration error',
        });
        return;
      }

  const decoded = jwt.verify(token, secret) as { id: string; username: string; iat: number; exp: number };
      // Load full user to satisfy typing and keep req.user consistent across app
      const user: UserInterface | null = await AuthRepository.findUserById(decoded.id);
      if (!user) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized',
          errors: ['User not found'],
        });
        return;
      }

      req.user = user;
      next();
    } catch (err: any) {
      // jwt errors: TokenExpiredError, JsonWebTokenError, NotBeforeError
      const isJwtError = err?.name && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(err.name);
      res.status(isJwtError ? 401 : 500).json({
        status: 'error',
        message: isJwtError ? 'Invalid or expired token' : 'Authentication failed',
      });
    }
  };
}
