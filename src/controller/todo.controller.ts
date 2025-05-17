import todoService from '../services/todo.service';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export default {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, userId } = req.body;
      if (!title || !userId) {
        throw new createError.BadRequest('Title and user ID are required');
      }
      const todo = await todoService.createTodo(title, userId);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  },

  async getUserTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getUserTodos(req.params.userId);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, completed, userId } = req.body;
      if (!userId) {
        throw new createError.BadRequest('User ID is required');
      }
      const todo = await todoService.updateTodo(
        req.params.id,
        userId,
        { title, completed }
      );
      res.json(todo);
    } catch (error) {
      next(error);
    }
  },

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.body;
      if (!userId) {
        throw new createError.BadRequest('User ID is required');
      }
      const todo = await todoService.deleteTodo(req.params.id, userId);
      res.json({
        success: true,
        message: 'Todo deleted successfully',
        deletedTodo: todo
      });
    } catch (error) {
      next(error);
    }
  }
};