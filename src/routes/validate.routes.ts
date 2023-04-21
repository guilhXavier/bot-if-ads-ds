import { Router } from 'express';
import { postValidateUser } from '../controllers/validate.controller';

const router = Router();

router.post('/validate/:token', postValidateUser);

export { router };
