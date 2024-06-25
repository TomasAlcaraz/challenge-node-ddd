import User, { IUser } from "../../../domain/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid username or password");
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
