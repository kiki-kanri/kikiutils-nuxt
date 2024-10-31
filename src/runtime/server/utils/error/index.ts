import { createError } from 'h3';

export const badRequestError = (message: string = 'bad request') => createH3Error(400, message);
export const conflictError = (message: string = 'conflict') => createH3Error(409, message);
export const createH3Error = (statusCode: number = 500, message: string = 'error') => createError({ message, status: statusCode, statusCode, statusText: message });
export const forbiddenError = (message: string = 'forbidden') => createH3Error(403, message);
export const internalServerError = (message: string = 'error') => createH3Error(500, message);
export const notFoundError = (message: string = 'not found') => createH3Error(404, message);
export const tooManyRequestsError = (message: string = 'too many requests') => createH3Error(429, message);
export const unauthorizedError = (message: string = 'unauthorized') => createH3Error(401, message);
export const unsupportedMediaTypeError = (message: string = 'unsupported media type') => createH3Error(415, message);
