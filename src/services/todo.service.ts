import { STATUS_MESSAGES } from '../constants/statusMessages';
import todoRepository from '../repository/todo.repository';
import createError from 'http-errors';

export default {
  async createTodo(title: string, userId: string) {
    const todo = await todoRepository.create({ title, user: userId });
    await todoRepository.addTodoToUser(userId, todo._id);
    return todo;
  },

  async getUserTodos(userId: string) {
    const todos = await todoRepository.findByUser(userId);
    if (!todos.length) throw new createError.NotFound(STATUS_MESSAGES.TODO_NOT_FOUND);
    return todos;
  },

  async updateTodo(todoId: string, updateData: any) {
    const todo = await todoRepository.findAndUpdate(todoId, updateData);
    if (!todo) throw new createError.NotFound(STATUS_MESSAGES.TODO_NOT_FOUND);
    return todo;
  },

  async deleteTodo(todoId: string, userId: string) {
    const todo = await todoRepository.findAndDelete(todoId, userId);
    if (!todo) throw new createError.NotFound(STATUS_MESSAGES.TODO_NOT_FOUND);
    await todoRepository.removeTodoFromUser(userId, todoId);
    return todo;
  }
};