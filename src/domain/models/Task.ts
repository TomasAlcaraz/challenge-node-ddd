import { Schema, model, Document } from "mongoose";
import { statusEnum } from "../../infrastructure/utils/statusEnum";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  projectId: Schema.Types.ObjectId;
  assignedTo: Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
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
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
