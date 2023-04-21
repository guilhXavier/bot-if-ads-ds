import Express from 'express';
import Morgan from 'morgan';
import { router as ValidateRouter } from './routes/validate.routes';

const App = Express();

App.use(Morgan('dev'));

App.use('/users', ValidateRouter);

App.get('/', (_, res) => {
  res.send('This is a response');
});

App.listen(3000, () => {
  console.log('listening');
});
