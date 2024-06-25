import { Request, Response } from "express";
import { getProjectByUser } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Project from "../../../domain/models/Project";

export const getProjectByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const projects = await Project.findById(id)
      .populate({
        path: "members",
        select: "_id username email roles",
      })
      .populate({
        path: "tasks",
        select: "_id title dueDate status assignedTo",
      });

    sendSuccessResponse(res, projects);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

