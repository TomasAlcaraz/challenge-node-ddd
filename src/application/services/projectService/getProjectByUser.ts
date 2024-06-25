import Project, { IProject } from "../../../domain/models/Project";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

interface ParamsUserStatus {
  members: string;
  status?: statusEnum;
}

export const getProjectByUser = async (
  userId: string,
  status?: statusEnum
): Promise<IProject[]> => {
  try {
    const query: ParamsUserStatus = { members: userId };
    if (status) {
      query.status = status;
    }

    const projects = await Project.find(query)
      .populate({
        path: "members",
        select: "_id username email roles",
      })
      .populate({
        path: "tasks",
        select: "_id title dueDate status assignedTo",
      });

    return projects;
  } catch (error: any) {
    throw new Error(`Failed to get projects: ${error.message}`);
  }
};
