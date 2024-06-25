import { Request, Response } from "express";
import { deleteTask } from "../../../application/services/taskService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Task from "../../../domain/models/Task";
import Project from "../../../domain/models/Project";
import User from "../../../domain/models/User";

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }

    console.log(task);

    // Remove the task from the project
    await Project.findByIdAndUpdate(task.projectId, {
      $pull: { tasks: task._id },
    });

    // Remove the task from the user
    await User.findByIdAndUpdate(task.assignedTo, {
      $pull: { tasks: task._id },
    });

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(task._id);
    sendSuccessResponse(res, deletedTask);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
