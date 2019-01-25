import { Router } from 'express';
import validateParams from '../middlewares/req-params';
import commentController from '../controllers/v1/CommentController';
import Auth from '../middlewares/Auth';

const commentRouter = Router();

commentRouter.get('/', commentController.list);
commentRouter.get('/:id', validateParams, commentController.retrieve);
commentRouter.post('/', Auth.verifyToken, commentController.create);
commentRouter.delete('/:id', validateParams, Auth.verifyToken, commentController.delete);

export default commentRouter;
