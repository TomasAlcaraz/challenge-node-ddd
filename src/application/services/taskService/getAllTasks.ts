import Task from "../../../domain/models/Task";

export const getAllTasks = async () => {
  const projects = await Task.find().populate({
    path: "comments",
  });

  const total = await Task.countDocuments();
  return { projects, total };
};
