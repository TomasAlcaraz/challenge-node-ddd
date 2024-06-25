import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return sendSuccessResponse(res, "Access denied. No token provided.", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return sendErrorResponse(res, "Invalid token");
  }
};
