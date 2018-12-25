import { Router } from 'express';
import meetupRouter from './meetups';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Questioner API',
  });
});
apiRouter.use('/meetups', meetupRouter);

export default apiRouter;
