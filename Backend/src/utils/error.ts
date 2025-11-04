import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorHandler: ErrorRequestHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
    return;
  }

  // Log unexpected errors for diagnostics
  console.error(err);

  res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
  });
  return;
};
