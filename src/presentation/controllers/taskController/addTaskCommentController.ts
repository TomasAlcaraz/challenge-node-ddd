import { Request, Response } from "express";
import Joi from "joi";
import { Schema, Types } from "mongoose";
import Task from "../../../domain/models/Task";
import Comment, { IComment } from "../../../domain/models/Comment";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";

const validateComment = Joi.object({
  content: Joi.string().required(),
  author: Joi.string().hex().length(24).required(), // Assumed author is the user ID
});

export const addTaskCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error, value } = validateComment.validate(req.body);
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    const newComment: IComment = new Comment(value);
    await newComment.save();

    if (!Types.ObjectId.isValid(newComment._id as string)) {
      throw new Error("Invalid user ID");
    }

    const newCommentId = newComment._id as Schema.Types.ObjectId;

    task.comments.push(newCommentId);
    await task.save();

    sendSuccessResponse(res, newComment, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
