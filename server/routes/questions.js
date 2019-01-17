import { Router } from 'express';
import QuestionController from '../controllers/v1/QuestionController';
import validateParams from '../middlewares/req-params';
import Auth from '../middlewares/Auth';

const questionRouter = Router();

questionRouter.get('/', QuestionController.list);
questionRouter.get('/:id', validateParams, QuestionController.retrieve);
questionRouter.post('/', Auth.verifyToken, QuestionController.create);
questionRouter.patch('/:id/upvote', validateParams, QuestionController.upVote);
questionRouter.patch('/:id/downvote', validateParams, QuestionController.downVote);

export default questionRouter;
