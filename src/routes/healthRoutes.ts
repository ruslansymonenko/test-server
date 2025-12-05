import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';

export const createHealthRouter = (): Router => {
  const router = Router();

  router.get('/', healthCheck);

  return router;
};
