import { Request, Response } from "express";
import { getAllTasks } from "../../../application/services/taskService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

export const getAllTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    sendSuccessResponse(res, tasks);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

