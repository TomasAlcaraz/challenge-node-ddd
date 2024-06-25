import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Project from "../../../domain/models/Project";

export const updateProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // validate body arguments
    const { error } = projectUpdateSchema.validate(updateData);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    // Ensure that the _id isn't in the update data
    if (updateData._id) {
      throw new Error("Cannot update _id field");
    }

    // update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true } 
    );

    if (!updatedProject) {
      throw new Error("Project not found or no changes detected");
    }

    const project = await Project.findById(id)
      .select("_id title status")
      .populate({
        path: "members",
        select: "_id username email roles",
      })
      .populate({
        path: "tasks",
        select: "_id title dueDate status assignedTo",
      });

    sendSuccessResponse(res, project);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

import Joi from "joi";

export const projectUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string()
    .valid(...Object.values(statusEnum))
    .optional(),
  members: Joi.array().items(Joi.string().hex().length(24)).optional(),
  tasks: Joi.array().items(Joi.string().hex().length(24)).optional(),
}).min(1);


