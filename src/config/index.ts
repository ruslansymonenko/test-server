export interface Config {
  port: number;
  env: string;
  isDevelopment: boolean;
  isProduction: boolean;
  uploads: {
    storageType: 'local' | 'docker' | 'cloud';
    localPath: string;
    dockerVolume: string;
    baseUrl?: string;
    maxFileSize: number;
    maxFiles: number;
    cloudProvider?: 'aws' | 'gcp' | 'azure';
    cloudConfig?: {
      bucket?: string;
      region?: string;
      accessKey?: string;
      secretKey?: string;
      projectId?: string;
    };
  };
}

export const getConfig = (): Config => {
  const port = parseInt(process.env.PORT || '3000', 10);
  const env = process.env.NODE_ENV || 'development';

  return {
    port,
    env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',

    uploads: {
      storageType: (process.env.STORAGE_TYPE as any) || 'local',
      localPath: process.env.STORAGE_LOCAL_PATH || './uploads',
      dockerVolume: process.env.STORAGE_DOCKER_VOLUME || '/app/uploads',
      baseUrl: process.env.STORAGE_BASE_URL,
      maxFileSize: parseInt(process.env.UPLOAD_MAX_FILE_SIZE || '10485760', 10), // 10MB default
      maxFiles: parseInt(process.env.UPLOAD_MAX_FILES || '10', 10),

      cloudProvider: process.env.STORAGE_CLOUD_PROVIDER as any,
      cloudConfig: {
        bucket: process.env.STORAGE_CLOUD_BUCKET,
        region: process.env.STORAGE_CLOUD_REGION,
        accessKey: process.env.STORAGE_CLOUD_ACCESS_KEY,
        secretKey: process.env.STORAGE_CLOUD_SECRET_KEY,
        projectId: process.env.STORAGE_CLOUD_PROJECT_ID,
      },
    },
  };
};
