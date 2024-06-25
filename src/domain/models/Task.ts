import { Schema, model, Document } from "mongoose";
import { statusEnum } from "../../infrastructure/utils/statusEnum";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  projectId: Schema.Types.ObjectId;
  assignedTo: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum.NOT_STARTED,
      required: true,
    },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: false,
  }
);

const Task = model<ITask>("Task", TaskSchema);

export default Task;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the task
 *         status:
 *           type: string
 *           enum:
 *             - not started
 *             - in progress
 *             - completed
 *           description: The status of the task
 *         assignedTo:
 *           $ref: '#/components/schemas/User'
 *           description: The user to whom the task is assigned
 */