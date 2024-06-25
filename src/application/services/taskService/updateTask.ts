import Task, { ITask } from "../../../domain/models/Task";
import User from "../../../domain/models/User";
import { notifyTaskUpdate } from "../notificationService";
import { scheduleReminder } from "../reminderService";

export const updateTask = async (taskId: string, updates: Partial<ITask>) => {
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
