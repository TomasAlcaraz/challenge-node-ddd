import mongoose, { Schema, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../infrastructure/config/envConfig";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  roles: string[];
  projects: Schema.Types.ObjectId[];
  tasks: Schema.Types.ObjectId[];
  generateAuthToken(): string
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    timestamps: false,
  }
);

// Method to generate auth token
UserSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};


export default mongoose.model<IUser>("User", UserSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *           unique: true
 *         password:
 *           type: string
 *           description: The password of the user
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *           description: The roles assigned to the user
 *           default: ["user"]
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: List of project IDs associated with the user
 *         tasks:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *           description: List of task IDs associated with the user
 *       example:
 *         username: johndoe
 *         email: johndoe@examplee.com
 *         password: yourpassword
 *         roles: ["user", "admin"]
 *         projects: ["60d5f9f8e12b1c001c8e4b0d", "60d5fa2be12b1c001c8e4b0e"]
 *         tasks: ["60d5fa4be12b1c001c8e4b0f", "60d5fa5fe12b1c001c8e4b10"]
 */
