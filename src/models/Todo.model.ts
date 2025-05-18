// src/models/Todo.ts
import { Schema, model, Document } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  title: string;
  completed: boolean;
  user: Schema.Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default model<ITodo>('Todo', TodoSchema);