import todoService from '../services/todo.service';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export default {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
       console.log("createTodo");
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
      console.log("getUserTodos");
      const todos = await todoService.getUserTodos(req.params.userId);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  },

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      
      const { title } = req.body;
      console.log("title::"+title)
       const todo = await todoService.updateTodo(
         req.params.todoId,
         { title }
       );
       res.json(todo);
    } catch (error) {
      console.log("parameter")
      next(error);
    }
  },

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("deleteTodo");
      const { userId } = req.body;
      if (!userId) {
        throw new createError.BadRequest('User ID is required 1');
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