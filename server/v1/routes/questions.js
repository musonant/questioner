import { Router } from 'express';
import QuestionController from '../Controllers/QuestionController';

const questionRouter = Router();

questionRouter.post('/', QuestionController.create);

export default questionRouter;
