import { ObjectId } from "mongoose";
import Project, { IProject } from "../../../domain/models/Project";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

export interface ParamsStatus {
  status?: statusEnum;
}

export const deleteProject = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  // Delete the task
  await Project.findByIdAndDelete(id);
  return { project };
};
