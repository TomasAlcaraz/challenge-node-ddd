import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import Comment from "../../../domain/models/Comment";
import Joi from "joi";

const validateUpdateComment = Joi.object({
  content: Joi.string().required(),
}).min(1);

export const updateCommentByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // validate body arguments
    const { error, value } = validateUpdateComment.validate(updateData);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    // update the comment
    const updatedComment = await Comment.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updatedComment) {
      throw new Error("Comment not found");
    }

    sendSuccessResponse(res, updatedComment);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
