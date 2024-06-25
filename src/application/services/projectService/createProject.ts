import mongoose, { ObjectId, Schema } from "mongoose";
import Project, { IProject } from "../../../domain/models/Project";
import User from "../../../domain/models/User";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";


export interface ProjectData {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  members: ObjectId[];
}

export const createProject = async (
  projectData: ProjectData
): Promise<IProject> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newProject = new Project(projectData);
    await newProject.save({ session });
    console.log("servicio create project");

    if (projectData.members.length) {
      for (let i = 0; i < projectData.members.length; i++) {
        const user = await User.findById(projectData.members[i]).session(
          session
        );
        if (!user) {
          throw new Error(`User ${i + 1} was not found with the provided id`);
        }
        user.projects.push(newProject._id as Schema.Types.ObjectId);
        await user.save({ session });
        console.log(`Updated user ${user._id} with new project ID`);
      }
    }

    await session.commitTransaction();
    session.endSession();
    return newProject;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to create project: ${error.message}`);
  }
};
