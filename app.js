import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './server/routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', port);
app.listen(port, () => console.log(`App listening on port ${port}`));

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'The amazing Questioner APP',
  });
});

app.use('/api/v1/', apiRouter);

app.use('*', (req, res) => {
  res.status(404).send({
    status: 404,
    error: 'This path does not exist',
  });
});

export default app;
