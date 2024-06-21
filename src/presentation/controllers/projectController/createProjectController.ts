import { Request, Response } from "express";
import { createProject } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, status, users } = req.body;
    const newProject = await createProject({
      title,
      description,
      dueDate,
      status,
      users,
    });
    sendSuccessResponse(res, newProject, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { createProjectController };


