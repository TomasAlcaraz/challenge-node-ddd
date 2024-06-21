import { Request, Response } from "express";
import { getProjectsByUser } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const getProjectByUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status, page, limit } = req.query;
    const projects = await getProjectsByUser(userId, status as string);
    sendSuccessResponse(res, projects);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

export { getProjectByUserController };


