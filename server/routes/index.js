import { Router } from 'express';
import meetupRouter from './meetups';
import questionRouter from './questions';
import userRouter from './users';
import commentsRouter from './comments';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Questioner API',
  });
});

apiRouter.use('/meetups', meetupRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/comments', commentsRouter);

export default apiRouter;
