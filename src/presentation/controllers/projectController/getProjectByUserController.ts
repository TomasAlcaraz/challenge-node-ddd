import { Request, Response } from "express";
import { getProjectByUser } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import Project from "../../../domain/models/Project";

export const getProjectByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const projects = await Project.find({ members: id })
      .select("_id title status")
      .populate({
        path: "members",
        select: "_id username email",
      })
      .populate({
        path: "tasks",
        select: "_id title dueDate status assignedTo",
      })
      .populate({
        path: "comments",
      });

    sendSuccessResponse(res, projects);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
