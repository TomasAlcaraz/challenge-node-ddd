import { Request, Response } from "express";
import Project from "../../../domain/models/Project";
import Comment, { IComment } from "../../../domain/models/Comment";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import mongoose, { Schema, Types } from "mongoose";
import Joi from "joi";

export const validateProjectComment = Joi.object({
  content: Joi.string().required(),
  author: Joi.string().hex().length(24).required(),
});

export const addProjectCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }

    const { error } = validateProjectComment.validate({ content, author });
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(", ")}`
      );
    }

    const newComment: IComment = new Comment({ content, author });
    await newComment.save();
    if (!mongoose.Types.ObjectId.isValid(newComment._id as string)) {
      throw new Error("Invalid user ID");
    }

    const newCommentId = newComment._id as Schema.Types.ObjectId;

    project.comments.push(newCommentId);
    await project.save();

    sendSuccessResponse(res, newComment, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
