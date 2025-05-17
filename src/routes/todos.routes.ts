import { Router } from 'express';
import todoController from '../controller/todo.controller';
import errorHandler from '../middlewares/errorHandler';

const router = Router();

router.post('/', todoController.createTodo);
router.get('/user/:userId', todoController.getUserTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

// Error handling middleware (should be last)
router.use(errorHandler);

export default router;