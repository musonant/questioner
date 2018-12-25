import { Router } from 'express';
import meetupController from '../Controllers/meetup';

const meetupRouter = Router();

meetupRouter.get('/', meetupController.list);
meetupRouter.get('/:id', meetupController.retrieve);

export default meetupRouter;
