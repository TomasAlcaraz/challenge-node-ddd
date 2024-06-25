import { Request, Response } from "express";
import { deleteProject } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import Project from "../../../domain/models/Project";
import mongoose from "mongoose";
import Task from "../../../domain/models/Task";
import Comment from "../../../domain/models/Comment";

export const deleteProjectController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const project = await Project.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    await Project.findByIdAndDelete(id);

    sendSuccessResponse(res, project);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
