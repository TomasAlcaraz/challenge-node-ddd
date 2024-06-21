import User, { IUser } from "../../domain/models/User";

const getAllUsers = async () => {
  const users = await User.find();

  const total = await User.countDocuments();
  return { users, total };
};

const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const newUser = new User({ username, email, password });
    const savedTask = await newUser.save();
    return savedTask;
  } catch (error: any) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

export { createUser, getAllUsers };
