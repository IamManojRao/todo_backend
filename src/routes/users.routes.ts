// routes/users.ts
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import createError from 'http-errors';

const userRouter = Router();

// Create user
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      throw new createError.BadRequest('Username and email are required');
    }
    const user = await userService.createUser(username, email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Get all users
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by ID
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default userRouter;