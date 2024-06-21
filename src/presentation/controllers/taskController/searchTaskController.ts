import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { searchTasks } from "../../../application/services/taskService";

const searchTasksController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { searchTerm, page, limit } = req.query;
    const tasks = await searchTasks(userId, searchTerm as string);
    sendSuccessResponse(res, tasks);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { searchTasksController };
