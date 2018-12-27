import { Router } from 'express';
import MeetupController from '../Controllers/MeetupController';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.list);

export default meetupRouter;
