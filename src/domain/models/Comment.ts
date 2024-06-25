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
