import { Request, Response } from "express";
import {
  register,
  login,
} from "../../application/services/authService/index.js";
import {
  sendSuccessResponse,
  sendErrorResponse,
} from "../../infrastructure/utils/response";
import User, { IUser } from "../../domain/models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";

const validateUser = (user: any, isUpdate = false) => {
  const schema = Joi.object({
    username: isUpdate ? Joi.string().optional() : Joi.string().required(),
    email: isUpdate
      ? Joi.string().email().optional()
      : Joi.string().email().required(),
    password: isUpdate
      ? Joi.string().min(8).optional()
      : Joi.string().min(8).required(),
  });

  return schema.validate(user);
};

const registerController = async (req: Request, res: Response) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return sendErrorResponse(res, error.details[0].message);

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = user.generateAuthToken();
    return sendSuccessResponse(res, { user, token });
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    return sendSuccessResponse(res, { token }, 201);
  } catch (error: any) {
    return sendErrorResponse(res, error.message);
  }
};

export { registerController, loginController };
