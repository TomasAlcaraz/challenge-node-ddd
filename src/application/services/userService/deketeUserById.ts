import User from "../../../domain/models/User";

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
