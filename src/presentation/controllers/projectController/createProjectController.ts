import { Request, Response } from "express";
import { createProject } from "../../../application/services/projectService";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../../infrastructure/utils/response";
import { statusEnum } from "../../../infrastructure/utils/statusEnum";
import Project, { IProject } from "../../../domain/models/Project";
import User from "../../../domain/models/User";
import mongoose from "mongoose";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, members } = req.body;
    const projectData = {
      title,
      description,
      dueDate,
      status: statusEnum.NOT_STARTED,
      members,
    };

    const newProject = new Project(projectData);

    await newProject.save();
    console.log("servicio create project");
    if (projectData.members.length) {
      for (let i = 0; i < projectData.members.length; i++) {
        console.log(projectData.members[i]);
        const user = await User.findById(projectData.members[i]);
        if (!user)
          throw new Error(`user ${i + 1} was not found with the provided id`);
        console.log(user);
        user.projects.push(newProject._id as mongoose.Types.ObjectId);
        await user.save();
        console.log(user);
      }
    }

    sendSuccessResponse(res, newProject, 201);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};

