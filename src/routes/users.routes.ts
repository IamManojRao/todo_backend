import { Router } from 'express';
import userController from '../controller/user.controller';
import errorHandler from '../middlewares/errorHandler';

const userRouter = Router();

// Create user
userRouter.post('/', userController.createUser);

// Get all users
userRouter.get('/', userController.getAllUsers);

// Get user by ID
userRouter.get('/:id', userController.getUserById);


userRouter.get('/email/:email', userController.getUserByEmail);

// Error handling middleware (should be last)
userRouter.use(errorHandler);

export default userRouter;