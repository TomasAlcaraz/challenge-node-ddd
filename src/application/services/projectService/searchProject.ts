import Project, { IProject } from "../../../domain/models/Project";

export interface ISearchProjectsResponse {
  projects: IProject[];
  total: number;
}

export const searchProjects = async (
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
