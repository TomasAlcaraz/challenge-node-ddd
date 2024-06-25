import { FilterQuery } from "mongoose";
import Task, { ITask } from "../../../domain/models/Task";

export const getTasksByUser = async (
  userId: string,
  status?: string
): Promise<ITask[]> => {
  try {
    const query: FilterQuery<ITask> = { assignedTo: userId };
    if (status) query["status"] = status;

    const tasks = await Task.find(query).populate({
      path: "comments",
    });
    return tasks;
  } catch (error: any) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};
