import { Schema, model, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  users: Schema.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

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

const Project = model<IProject>("Project", projectSchema);

export default Project;
