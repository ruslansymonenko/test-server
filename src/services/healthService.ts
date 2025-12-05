export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

export const getHealthStatus = (): HealthStatus => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };
};
