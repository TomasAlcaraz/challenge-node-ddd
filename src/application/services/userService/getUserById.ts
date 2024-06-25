import User, { IUser } from "../../../domain/models/User";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";

export interface ParamsUserById {
  id: string;
  projectStatus?: statusEnum;
  taskStatus?: statusEnum;
}

export const getUserById = (data: ParamsUserById) => {
  try {
    console.log("medio");

    const user = User.findById(data.id)
      .populate({
        path: "projects",
        match: data.projectStatus ? { status: data.projectStatus } : {},
        populate: {
          path: "tasks",
          match: data.taskStatus ? { status: data.taskStatus } : {},
        },
      })
      .populate({
        path: "tasks",
        match: data.taskStatus ? { status: data.taskStatus } : {},
      });

    if (!user) throw new Error("User not found");
    return user;
  } catch (error: any) {
    throw new Error(`Failed to get projects: ${error.message}`);
  }
};
