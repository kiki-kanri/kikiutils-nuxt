export const badRequestError = (message: string = 'bad request') => createH3Error(400, message);
export const conflictError = (message: string = 'conflict') => createH3Error(409, message);
export const createH3Error = (statusCode: number = 500, statusMessage: string = 'error') => createError({ status: statusCode, statusCode, statusMessage, statusText: statusMessage });
export const forbiddenError = (message: string = 'forbidden') => createH3Error(403, message);
export const internalServerError = (message: string = 'error') => createH3Error(500, message);
export const notFoundError = (message: string = 'not found') => createH3Error(404, message);
export const unauthorizedError = (message: string = 'unauthorized') => createH3Error(401, message);