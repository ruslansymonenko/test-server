export interface Config {
  port: number;
  env: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export const getConfig = (): Config => {
  const port = parseInt(process.env.PORT || '3000', 10);
  const env = process.env.NODE_ENV || 'development';

  return {
    port,
    env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
  };
};
