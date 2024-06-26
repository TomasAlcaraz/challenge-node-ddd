import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import Comment from "../../../domain/models/Comment";
import Task from "../../../domain/models/Task";
import Project from "../../../domain/models/Project";

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { taskId, projectId } = req.query;
    let commentDeletedFrom = "";

    if (!taskId && !projectId) {
      throw new Error(
        "The id of the task or project to which the comment is associated must be queried, sent by query."
      );
    }

    // find comment
    const comment = await Comment.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    // delete comment
    await Comment.findByIdAndDelete(id);

    // if exists delete the comment associated with the task
    if (taskId) {
      const task = await Task.findById(taskId);
      if (task) {
        task.comments = task.comments.filter(
          (commentId) => commentId.toString() !== id
        );
        await task.save();
        commentDeletedFrom = "task";
      }
    }

    // if exists delete the comment associated with the project
    if (projectId) {
      const project = await Project.findById(projectId);
      if (project) {
        project.comments = project.comments.filter(
          (commentId) => commentId.toString() !== id
        );
        await project.save();
        commentDeletedFrom = "project";
      }
    }

    if (!commentDeletedFrom) {
      throw new Error("Comment not found in associated task or project");
    }

    sendSuccessResponse(res, comment, 204);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
