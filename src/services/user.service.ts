// services/user.service.ts
import createError from 'http-errors';
import { IUser } from '../models/User.model';
import { IUserRepository, UserRepository } from '../repository/user.repository';
import { STATUS_MESSAGES } from '../constants/statusMessages';

export class UserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository = new UserRepository()) {
    this.repository = repository;
  }

  async createUser(email: string): Promise<any> {
    try {
      const userExists = await this.repository.exists(email);

      if (userExists) {
        throw new createError.Conflict(STATUS_MESSAGES.EMAIL_ID_EXISTS);
      }

      const createdUser = await this.repository.create({ email });

      return createdUser;

    } catch (error) {
      // Handle known or unknown DB errors
      console.error(STATUS_MESSAGES.ERROR_IN_USER_CREATION, error);

      // Rethrow as a standardized HTTP error
      throw new createError.InternalServerError();
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
    if (!user) throw new createError.NotFound(STATUS_MESSAGES.USER_NOT_FOUND);
    return user;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.repository.findByEmail(email);
    return user;
  }
}