import { Router } from 'express';
import QuestionController from '../controllers/v1/QuestionController';

const questionRouter = Router();

questionRouter.get('/', QuestionController.list);
questionRouter.get('/:id', QuestionController.retrieve);
questionRouter.post('/', QuestionController.create);
questionRouter.patch('/:id/upvote', QuestionController.upVote);
questionRouter.patch('/:id/downvote', QuestionController.downVote);

export default questionRouter;
