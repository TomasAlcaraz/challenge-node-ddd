import { Response } from 'express';

const sendSuccessResponse = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

const sendErrorResponse: any = (res: Response, message: string, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export { sendSuccessResponse, sendErrorResponse };