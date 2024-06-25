import { updateUserById } from "../../../application/services/userService";
import { Request, Response } from "express";
import User, { IUser } from "../../../domain/models/User";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../../infrastructure/utils/response";

export const updateUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates: Partial<IUser> = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }

    sendSuccessResponse(res, updatedUser);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
