import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { sendErrorResponse } from "../utils/response";

export const validateId = [
  check("id").isMongoId().withMessage("Invalid user ID"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, "The id is invalid");
    }
    next();
  },
];
