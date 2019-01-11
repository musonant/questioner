import { Router } from 'express';
import MeetupController from '../controllers/v1/MeetupController';
import validateParams from '../middlewares/req-params';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.list);
meetupRouter.get('/:id', validateParams, MeetupController.retrieve);
meetupRouter.post('/', MeetupController.create);
meetupRouter.post('/:id/rsvps', MeetupController.replyInvite);

export default meetupRouter;
