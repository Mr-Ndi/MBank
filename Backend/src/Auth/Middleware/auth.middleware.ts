import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthRepository from '../Repository/Auth.repo.js';
import { UserInterface } from '../Interface/Auth.interface.js';
import { AppError } from '../../utils/error.js';

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
        return next(new AppError('Missing or invalid Authorization header', 401));
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return next(new AppError('Token not provided', 401));
      }

      const secret = process.env.JWT_SECRET as string;
      if (!secret) {
        // Misconfiguration guard
        return next(new AppError('Server configuration error', 500));
      }

  const decoded = jwt.verify(token, secret) as { id: string; username: string; role: 'ADMIN' | 'GUEST'; iat: number; exp: number };
      // Load full user to satisfy typing and keep req.user consistent across app
      const user: UserInterface | null = await AuthRepository.findUserById(decoded.id);
      if (!user) {
        return next(new AppError('User not found', 401));
      }

      req.user = user;
      next();
    } catch (err: any) {
      // jwt errors: TokenExpiredError, JsonWebTokenError, NotBeforeError
      const isJwtError = err?.name && ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'].includes(err.name);
      return next(new AppError(isJwtError ? 'Invalid or expired token' : 'Authentication failed', isJwtError ? 401 : 500));
    }
  };

  static requireRoles = (...roles: Array<'ADMIN' | 'GUEST'>) => (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }
    const role = (req.user as any).role as 'ADMIN' | 'GUEST' | undefined;
    if (!role || !roles.includes(role)) {
      return next(new AppError('Forbidden', 403));
    }
    return next();
  }
}
