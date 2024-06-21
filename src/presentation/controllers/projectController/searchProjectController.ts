import { Request, Response } from "express";
import { searchProjects } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const searchProjectsController = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { searchTerm, page, limit } = req.query;
      const projects = await searchProjects(userId, searchTerm as string);
      sendSuccessResponse(res, projects);
    } catch (error: any) {
      sendErrorResponse(res, error.message);
    }
  }

export { searchProjectsController };



