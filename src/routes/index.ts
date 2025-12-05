import { Router } from 'express';
import { createHealthRouter } from './healthRoutes';
import { getConfig } from '../config';
import { initializeUploadModule } from '../uploads/initialize';
import { createUploadRoutes } from '../uploads/uploadRoutes';

export const createApiRouter = (): Router => {
  const router = Router();
  const config = getConfig();

  router.use('/health', createHealthRouter());

  const uploadModule = initializeUploadModule(config);
  const uploadRoutes = createUploadRoutes({
    controller: uploadModule.controller,
    uploadLimits: uploadModule.uploadLimits,
  });
  router.use('/uploads', uploadRoutes);

  return router;
};
