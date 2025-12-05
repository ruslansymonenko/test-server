import { Router } from 'express';
import { createHealthRouter } from './healthRoutes';

export const createApiRouter = (): Router => {
  const router = Router();

  router.use('/health', createHealthRouter());

  return router;
};
