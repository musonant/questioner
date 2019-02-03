import { Router } from 'express';
import MeetupController from '../controllers/v1/MeetupController';
import validateParams from '../middlewares/req-params';
import Auth from '../middlewares/Auth';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.list);
meetupRouter.get('/:id', validateParams, MeetupController.retrieve);
meetupRouter.post('/', Auth.verifyToken, Auth.isAdmin, MeetupController.create);
meetupRouter.delete('/:id', validateParams, Auth.verifyToken, Auth.isAdmin, MeetupController.delete);
meetupRouter.post('/:id/rsvps', validateParams, Auth.verifyToken, MeetupController.replyInvite);

export default meetupRouter;
