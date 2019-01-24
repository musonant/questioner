import { Router } from 'express';
import UserController from '../controllers/v1/AuthController';
import validateParams from '../middlewares/req-params';
import Auth from '../middlewares/Auth';

const userRouter = Router();

userRouter.get('/', Auth.verifyToken, Auth.isAdmin, UserController.list);
userRouter.get('/:id', validateParams, Auth.verifyToken, Auth.isAdmin, UserController.retrieve);
userRouter.post('/signup', UserController.create);
userRouter.post('/login', UserController.login);

export default userRouter;
