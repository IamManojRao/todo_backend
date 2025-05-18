// services/user.service.ts
import createError from 'http-errors';
import { IUser } from '../models/User.model';
import { IUserRepository, UserRepository } from '../repository/user.repository';

export class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository = new UserRepository()) {
    this.repository = repository;
  }

  async createUser(email: string): Promise<any> {
    try {
      const userExists = await this.repository.exists(email);

      if (userExists) {
        throw new createError.Conflict('Email already exists');
      }

      const createdUser = await this.repository.create({ email });

      return createdUser;

    } catch (error) {
      // Handle known or unknown DB errors
      console.error('Error creating user:', error);

      // Rethrow as a standardized HTTP error
      throw new createError.InternalServerError('error on creating users');
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await this.repository.findById(id);
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.repository.findAll();
  }

  async deleteUser(id: string): Promise<IUser> {
    const user = await this.repository.deleteById(id);
    if (!user) throw new createError.NotFound('User not found');
    return user;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findByEmail(email);
    return user;
  }
}