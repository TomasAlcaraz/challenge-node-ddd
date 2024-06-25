import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { getTasksByUser } from "../../../application/services/taskService";
import { FilterQuery } from "mongoose";
import Task, { ITask } from "../../../domain/models/Task";

export const getTasksByUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;
    const query: FilterQuery<ITask> = { assignedTo: userId };
    if (status) query["status"] = status;

    const tasks = await Task.find(query).populate({
      path: "comments",
    });
    return sendSuccessResponse(res, tasks);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};
