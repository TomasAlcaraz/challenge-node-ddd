import { FilterQuery } from "mongoose";
import Task, { ITask } from "../../../domain/models/Task";

export const searchTasks = async (userId: string, searchTerm: string) => {
  const query: FilterQuery<ITask> = {
    assignedTo: userId,
    $text: { $search: searchTerm },
  };
  const tasks = await Task.find(query);
  const total = await Task.countDocuments(query);
  return { tasks, total };
};

const deleteTask = async (taskId: string): Promise<ITask | null> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new Error("Task not found");
    }
    return deletedTask;
  } catch (error: any) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};
