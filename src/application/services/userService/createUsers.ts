import bcrypt from "bcrypt";
import User, { IUser } from "../../../domain/models/User";

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedTask = await newUser.save();
    return savedTask;
  } catch (error: any) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};
