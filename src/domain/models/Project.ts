import { Schema, model, Document, Types } from "mongoose";
import { statusEnum } from "../../infrastructure/utils/statusEnum";

export interface IProject extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: statusEnum;
  members: Types.ObjectId[];
  tasks: Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: statusEnum,
      default: statusEnum.NOT_STARTED,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: true,
  }
);

const Project = model<IProject>("Project", ProjectSchema);

export default Project;

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - status
 *         - users
 *       properties:
 *         title:
 *           type: string
 *           description: The project title
 *         description:
 *           type: string
 *           description: The project description
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The project due date
 *         status:
 *           type: string
 *           enum: [not started, in progress, completed]
 *           description: The project status
 *         users:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: List of user IDs assigned to the project
 */
