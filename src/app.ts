import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createApiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { getConfig } from './config';

export const createApp = (): Application => {
  const app = express();
  const config = getConfig();

  app.use(helmet());
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (config.isDevelopment) {
    app.use(morgan('dev'));
  }
  app.use(requestLogger);

  app.use('/api', createApiRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
