import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { getTasksByUser } from "../../../application/services/taskService";

const getTasksByUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status, page, limit } = req.query;
    const tasks = await getTasksByUser(userId, status as string);
    sendSuccessResponse(res, tasks);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { getTasksByUserController };
