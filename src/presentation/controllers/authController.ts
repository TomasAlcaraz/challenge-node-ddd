import { Request, Response } from "express";
import { register, login } from "../../application/services/authService/index.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../infrastructure/utils/response";

const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await register(username, email, password);
    return sendSuccessResponse(res, newUser, 201);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    return sendSuccessResponse(res, { token }, 201);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};

export { registerController, loginController };
