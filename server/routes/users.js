import { Router } from 'express';
import UserController from '../controllers/v1/UserController';
import validateParams from '../middlewares/req-params';

const userRouter = Router();

userRouter.get('/', UserController.list);
userRouter.get('/:id', validateParams, UserController.retrieve);
userRouter.post('/', UserController.create);
userRouter.delete('/', UserController.delete);
userRouter.post('/login', UserController.login);

export default userRouter;
