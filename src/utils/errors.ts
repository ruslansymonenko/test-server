export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const createNotFoundError = (resource: string): AppError => {
  return new AppError(`${resource} not found`, 404);
};

export const createBadRequestError = (message: string): AppError => {
  return new AppError(message, 400);
};

export const createUnauthorizedError = (message: string = 'Unauthorized'): AppError => {
  return new AppError(message, 401);
};

export const createForbiddenError = (message: string = 'Forbidden'): AppError => {
  return new AppError(message, 403);
};
