import { Router } from 'express';
import MeetupController from '../controllers/v1/MeetupController';
import validateParams from '../middlewares/req-params';
import Auth from '../middlewares/Auth';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.list);
meetupRouter.get('/:id', validateParams, MeetupController.retrieve);
meetupRouter.post('/', Auth.verifyToken, Auth.isAdmin, MeetupController.create);
meetupRouter.post('/:id/tags', validateParams, Auth.verifyToken, Auth.isAdmin, MeetupController.addTags);
meetupRouter.post('/:id/images', validateParams, Auth.verifyToken, Auth.isAdmin, MeetupController.addImages);
meetupRouter.post('/:id/rsvps', validateParams, Auth.verifyToken, MeetupController.replyInvite);

export default meetupRouter;
