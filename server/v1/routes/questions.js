import { Router } from 'express';
import QuestionController from '../Controllers/QuestionController';

const questionRouter = Router();

questionRouter.post('/', QuestionController.create);
questionRouter.patch('/:id/upvote', QuestionController.upVote);

export default questionRouter;
