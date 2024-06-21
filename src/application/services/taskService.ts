import { FilterQuery } from "mongoose";
import Task, { ITask } from "../../domain/models/Task";
import User from "../../domain/models/User";
import { notifyTaskUpdate } from "./notificationService";
import { scheduleReminder } from "./reminderService";

interface TaskInput {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  projectId: string;
  assignedTo: string;
}

const createTask = async (taskInput: TaskInput): Promise<ITask> => {
  try {
    const newTask = new Task(taskInput);
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error: any) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

const getTasksByUser = async (
  userId: string,
  status?: string
): Promise<ITask[]> => {
  try {
    const query: FilterQuery<ITask> = { assignedTo: userId };
    if (status) query["status"] = status;

    const tasks = await Task.find(query);
    return tasks;
  } catch (error: any) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

const updateTask = async (taskId: string, updates: Partial<ITask>) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
    new: true,
  });
  if (!updatedTask) {
    throw new Error("Task not found");
  }

  // Send notification to the assigned user if the assignedTo field is updated
  if (updates.assignedTo) {
    const assignedUser = await User.findById(updatedTask.assignedTo);
    if (assignedUser) {
      await notifyTaskUpdate(assignedUser.email, updatedTask.title);
    }
  }

  // Reschedule reminder if dueDate is updated
    if (updates.dueDate) {
      scheduleReminder(updatedTask.id, new Date(updates.dueDate));
    }

  return updatedTask;
};

const searchTasks = async (userId: string, searchTerm: string) => {
  const query: FilterQuery<ITask> = {
    assignedTo: userId,
    $text: { $search: searchTerm },
  };
  const tasks = await Task.find(query);
  const total = await Task.countDocuments(query);
  return { tasks, total };
};

export { createTask, getTasksByUser, searchTasks, updateTask };
