import { Request, Response } from "express";
import { createUser } from "../../../application/services/userService";
import { IUser } from "../../../domain/models/User";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: IUser = req.body;

    const newUser = await createUser(username, email, password);

    sendSuccessResponse(res, newUser, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
