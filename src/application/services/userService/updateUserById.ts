import User, { IUser } from "../../../domain/models/User";

export const updateUserById = async (
  userId: string,
  updates: Partial<IUser>
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
