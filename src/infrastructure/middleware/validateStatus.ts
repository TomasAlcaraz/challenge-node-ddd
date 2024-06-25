import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../utils/response";
import { statusEnum } from "../utils/statusEnum";

export const validateStatus = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.query;

  if (status && !Object.values(statusEnum).includes(status as statusEnum)) {
    return sendErrorResponse(res, "Invalid status value");
  }

  try {
    next();
  } catch (error) {
    return sendErrorResponse(res, "Invalid token");
  }
};
