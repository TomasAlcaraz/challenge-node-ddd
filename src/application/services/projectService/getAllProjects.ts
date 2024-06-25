import Project, { IProject } from "../../../domain/models/Project";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

export interface ParamsStatus {
  status?: statusEnum;
}

export const getAllProjects = async (status?: statusEnum) => {

  const projects = await Project.find({ status }).select(
    "_id title status members"
  );

  const total = await Project.countDocuments();
  return { projects, total };
};
