import Todo from '../models/Todo.model';
import User from '../models/User.model';

export default {
  async create(todoData: { title: string; user: string }) {
    const todo = new Todo(todoData);
    return await todo.save();
  },

  async findByUser(userId: string) {
    return await Todo.find({ user: userId }).sort({ createdAt: -1 });
  },

  async findAndUpdate(todoId: string, updateData: any) {
    return await Todo.findOneAndUpdate(
      { _id: todoId },
      updateData
    );
  },

  async findAndDelete(todoId: string, userId: string) {
    return await Todo.findOneAndDelete({ _id: todoId, user: userId });
  },

  async addTodoToUser(userId: string, todoId: string) {
    await User.findByIdAndUpdate(userId, { $push: { todos: todoId } });
  },

  async removeTodoFromUser(userId: string, todoId: string) {
    await User.findByIdAndUpdate(userId, { $pull: { todos: todoId } });
  }
};