import { Request, Response } from "express";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { getUserById } from "../../../application/services/userService";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import { ParamsUserById } from "../../../application/services/userService/getUserById";
import User from "../../../domain/models/User";
import mongoose from "mongoose";

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { projectStatus, taskStatus } = req.query;
    const { id } = req.params;
    const data: ParamsUserById = { id: id as string };

    if (
      (projectStatus &&
        !Object.values(statusEnum).includes(projectStatus as statusEnum)) ||
      (taskStatus &&
        !Object.values(statusEnum).includes(taskStatus as statusEnum))
    ) {
      throw new Error(
        "Status can only be of three types: not started, in progress, completed"
      );
    }

    if (projectStatus) {
      data.projectStatus = projectStatus as statusEnum;
    }

    if (projectStatus) {
      data.taskStatus = taskStatus as statusEnum;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    if (
      projectStatus &&
      !mongoose.Types.ObjectId.isValid(projectStatus as string)
    ) {
      throw new Error("Invalid project status");
    }

    if (taskStatus && !mongoose.Types.ObjectId.isValid(taskStatus as string)) {
      throw new Error("Invalid task status");
    }

    const user = await User.findById(data.id)
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
    console.log(user);
    return sendSuccessResponse(res, user);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};
