import { Request, Response } from "express";
import { getAllProjects } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const getAllProjectsController = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    sendSuccessResponse(res, projects);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { getAllProjectsController };
