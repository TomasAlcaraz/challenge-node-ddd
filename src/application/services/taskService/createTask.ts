import Task, { ITask } from "../../../domain/models/Task";

interface TaskData {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  projectId: string;
  assignedTo: string;
}

export const createTask = async (task: TaskData): Promise<ITask> => {
  try {
    const newTask = new Task(task);
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error: any) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};
