import { Request, Response } from "express";
import { getAllUsers } from "../../../application/services/userService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const projects = await getAllUsers();
    sendSuccessResponse(res, projects);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { getAllUsersController };
