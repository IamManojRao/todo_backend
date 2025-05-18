// models/User.model.ts
import { Document, Schema, model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  todos: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

export default model<IUser>('User', UserSchema);