import { Router } from 'express';
import MeetupController from '../Controllers/MeetupController';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.list);
meetupRouter.get('/:id', MeetupController.retrieve);
meetupRouter.post('/', MeetupController.create);

export default meetupRouter;
