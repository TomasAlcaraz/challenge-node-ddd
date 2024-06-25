import { Request, Response } from "express";
import Task from "../../../domain/models/Task";
import Project from "../../../domain/models/Project";
import User from "../../../domain/models/User";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import mongoose from "mongoose";
import Joi from "joi";

// validate schema task
const taskValidate = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  projectId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  assignedTo: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  status: Joi.string()
    .valid(...Object.values(statusEnum))
    .optional(),
});

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, projectId, assignedTo, status } =
      req.body;

    // validate body arguments
    const { error } = taskValidate.validate(req.body);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    // validate project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new Error("Project not found with the provided id");
    }

    // create new taskF
    const newTask = new Task({
      title,
      description,
      dueDate,
      status: status || statusEnum.NOT_STARTED,
      projectId,
      assignedTo,
    });

    await newTask.save();

    // Verify that the assigned user exists and update his or her task list
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        throw new Error("User not found with the provided id");
      }
      user.tasks.push(newTask._id as mongoose.Types.ObjectId);
      await user.save();
    }

    // Verify that the assigned project exists and update his or her task list
    if (projectId) {
      const project = await Project.findById(projectId);
      if (!project) {
        throw new Error("User not found with the provided id");
      }
      project.tasks.push(newTask._id as mongoose.Types.ObjectId);
      await project.save();
    }

    sendSuccessResponse(res, newTask, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
