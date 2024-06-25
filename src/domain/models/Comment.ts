import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  author: Schema.Types.ObjectId;
}

export const CommentSchema: Schema<IComment> = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: false,
  }
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - author
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the comment.
 *         author:
 *           type: string
 *           format: ObjectId
 *           description: The ID of the user who authored the comment.
 *       example:
 *         content: This is a sample comment.
 *         author: 60b9f6482d4e6855502d35b0
 */