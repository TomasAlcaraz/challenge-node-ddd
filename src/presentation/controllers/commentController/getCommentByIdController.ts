import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import Comment from "../../../domain/models/Comment";

export const getCommentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    sendSuccessResponse(res, comment);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
