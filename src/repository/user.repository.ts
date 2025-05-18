// repositories/user.repository.ts
import { IUser } from '../models/User.model';
import { Document } from 'mongoose';

export interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  findById(id: Types.ObjectId | string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  deleteById(id: Types.ObjectId | string): Promise<IUser | null>;
  exists(email: string): Promise<boolean>;
}

// Implementation
import User from '../models/User.model';
import { Types } from 'mongoose';

export class UserRepository implements IUserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async findById(id: Types.ObjectId | string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  async deleteById(id: Types.ObjectId | string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  async exists(email: string): Promise<boolean> {
    const user = await User.findOne({ $or: [{ email }] });
    return !!user;
  }
}