import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Joi from "joi";
import Task from "../../../domain/models/Task";
import Project from "../../../domain/models/Project";

export const taskUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(statusEnum))
    .optional(),
  projectId: Joi.string().hex().length(24).optional(),
  assignedTo: Joi.string().hex().length(24).optional(),
}).min(1);

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // validate body arguments
    const { error } = taskUpdateSchema.validate(updateData);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    // Ensure that the _id is not present in the update data
    if (updateData._id) {
      throw new Error("Cannot update _id field");
    }

    // Get the previous project of the task
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    const previousProjectId = task.projectId;
    const previousUserId = task.assignedTo;

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedTask) {
      throw new Error("Task not found or no changes detected");
    }

    // If the task is moved to another project, remove it from the previous project and add it to the new one
    if (updateData.projectId && updateData.projectId !== previousProjectId) {
      await Project.findByIdAndUpdate(previousProjectId, {
        $pull: { tasks: id },
      });
      await Project.findByIdAndUpdate(updateData.projectId, {
        $push: { tasks: id },
      });
    }

    // If the task is assigned to another user, remove it from the previous user and add it to the new one
    if (updateData.assignedTo && updateData.assignedTo !== previousUserId) {
      await Project.findByIdAndUpdate(previousUserId, {
        $pull: { tasks: id },
      });
      await Project.findByIdAndUpdate(updateData.assignedTo, {
        $push: { tasks: id },
      });
    }

    // Return the updated task
    const updatedTaskWithPopulate = await Task.findById(id)
      .populate({
        path: "projectId",
        select: "_id title",
      })
      .populate({
        path: "assignedTo",
        select: "_id username email",
      });

    sendSuccessResponse(res, updatedTaskWithPopulate);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
