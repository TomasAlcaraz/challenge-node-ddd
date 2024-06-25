import { deleteCommentController } from "./deleteCommentController";
import { getCommentByIdController } from "./getCommentByIdController";
import { updateCommentByIdController } from "./updateCommentByIdController";

//  --- CREATE NEW COMMENT ---
// create new comment through projects or tasks endpoints --> tasks/:id/comments || projects/:id/comments

export {
  deleteCommentController,
  getCommentByIdController,
  updateCommentByIdController,
};
