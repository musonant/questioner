import { Router } from 'express';
import meetupRouter from './meetups';
import questionRouter from './questions';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Questioner API',
  });
});

apiRouter.use('/meetups', meetupRouter);
apiRouter.use('/questions', questionRouter);

export default apiRouter;
