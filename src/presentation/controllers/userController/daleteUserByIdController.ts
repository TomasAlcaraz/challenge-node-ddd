import { Request, Response } from "express";
import { deleteUserById } from "../../../application/services/userService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../../infrastructure/utils/response";
import User from "../../../domain/models/User";

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    
    sendSuccessResponse(res, deletedUser);
  } catch (error: any) {
    sendErrorResponse(res, error.message);
  }
};
