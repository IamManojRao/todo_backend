import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos.routes';
import userRouter from './routes/users.routes'
import connectDB from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/users', userRouter);
app.use('/api/todos', todosRouter);

export default app;