import Project from "../../../domain/models/Project";
import Task from "../../../domain/models/Task";
import User from "../../../domain/models/User";

export const deleteTask = async (taskId: string) => {
  try {
    // Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }

    // Remove the task from the project
    const projectId = task.projectId;
    await Project.findByIdAndUpdate(projectId, {
      $pull: { tasks: taskId },
    });

    // Remove the task from the user (assignee)
    const assigneeId = task.assignedTo;
    if (assigneeId) {
      await User.findByIdAndUpdate(assigneeId, {
        $pull: { tasks: taskId },
      });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
