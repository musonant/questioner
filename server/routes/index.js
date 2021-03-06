import { Router } from 'express';
import meetupRouter from './meetups';
import questionRouter from './questions';
import commentRouter from './comments';
import authRouter from './auth';
import tagRouter from './tags';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Questioner API',
  });
});

apiRouter.use('/meetups', meetupRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/tags', tagRouter);

export default apiRouter;
