import { Router } from 'express';
import validateParams from '../middlewares/req-params';
import commentController from '../controllers/v1/CommentController';
import Auth from '../middlewares/Auth';

const tagRouter = Router();

tagRouter.get('/', commentController.list);
tagRouter.get('/:id', validateParams, commentController.retrieve);
tagRouter.post('/', Auth.verifyToken, commentController.create);
tagRouter.delete('/:id', validateParams, Auth.verifyToken, commentController.delete);

export default tagRouter;
