import { Request, Response } from "express";
import { getAllUsers } from "../../../application/services/userService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import User from "../../../domain/models/User";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    // Consulta para obtener usuarios con filtrado y paginación
    const users = await User.find();

    return sendSuccessResponse(res, users);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};
