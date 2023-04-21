import { RequestHandler } from 'express';

const postValidateUser: RequestHandler = (_, res) => {
  res.send('User is validated');
};

export { postValidateUser };
