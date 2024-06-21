import Project, { IProject } from "../../domain/models/Project";

export interface ProjectData {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  users: string[];
}

export interface QueryParams {
  users: string;
  status?: string;
}

export interface ISearchProjectsResponse {
  projects: IProject[];
  total: number;
}

export const getAllProjects = async () => {
  const projects = await Project.find();

  const total = await Project.countDocuments();
  return { projects, total };
};

const createProject = async (projectData: ProjectData): Promise<IProject> => {
  try {
    const newProject = new Project(projectData);
    await newProject.save();
    return newProject;
  } catch (error: any) {
    throw new Error(`Failed to create project: ${error.message}`);
  }
};

const getProjectsByUser = async (
  userId: string,
  status?: string
): Promise<IProject[]> => {
  try {
    const query: QueryParams = { users: userId };
    if (status) query.status = status;
    const projects = await Project.find(query);
    return projects;
  } catch (error: any) {
    throw new Error(`Failed to get projects: ${error.message}`);
  }
};

const searchProjects = async (
  userId: string,
  searchTerm: string
): Promise<ISearchProjectsResponse> => {
  try {
    const query = {
      users: userId,
      $text: { $search: searchTerm },
    };

    const [projects, total] = await Promise.all([
      Project.find(query),
      Project.countDocuments(query),
    ]);

    return { projects, total };
  } catch (error: any) {
    throw new Error(`Error searching projects: ${error.message}`);
  }
};

export { createProject, getProjectsByUser, searchProjects };
