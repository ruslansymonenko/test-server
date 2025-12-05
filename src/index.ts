import dotenv from 'dotenv';
import { createApp } from './app';
import { getConfig } from './config';
import { logger } from './utils/logger';

dotenv.config();

const config = getConfig();
const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
  logger.info(`Health check available at: http://localhost:${config.port}/api/health`);
});

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received, closing server gracefully`);

  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason: Error | unknown) => {
  logger.error('Unhandled Rejection:', reason);
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});
