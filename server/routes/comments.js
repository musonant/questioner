import { Router } from 'express';
import validateParams from '../middlewares/req-params';
import commentController from '../controllers/v1/CommentController';

const commentRouter = Router();

commentRouter.get('/', commentController.list);
commentRouter.get('/:id', validateParams, commentController.retrieve);
commentRouter.post('/', commentController.create);
commentRouter.delete('/:id', validateParams, commentController.delete);

export default commentRouter;
