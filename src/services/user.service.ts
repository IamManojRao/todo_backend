// services/user.service.ts
import User, { IUser } from '../models/User.model';
import createError from 'http-errors';

export default {
  async createUser(username: string, email: string): Promise<IUser> {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new createError.Conflict('Username or email already exists');
    }
    const user = new User({ username, email });
    return await user.save();
  },

  async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    if (!user) throw new createError.NotFound('User not found');
    return user;
  },

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  },

  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  },

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new createError.NotFound('User not found');
    return user;
  }
};