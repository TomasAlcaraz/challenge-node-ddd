import User, { IUser } from '../../../domain/models/User';
import bcrypt from 'bcrypt';

export const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  return newUser;
};