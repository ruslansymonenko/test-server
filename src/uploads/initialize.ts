import { Config } from '../config';
import { createStorageAdapter, StorageConfig } from '../uploads/storage';
import { createUploadService } from '../uploads/uploadService';
import { createUploadController } from '../uploads/uploadController';
import { DEFAULT_IMAGE_RULES } from '../uploads/validators';

export const initializeUploadModule = (config: Config) => {
  const storageConfig: StorageConfig = {
    type: config.uploads.storageType,
    baseUrl: config.uploads.baseUrl,
  };

  switch (config.uploads.storageType) {
    case 'local':
      storageConfig.localPath = config.uploads.localPath;
      break;
    case 'docker':
      storageConfig.dockerVolume = config.uploads.dockerVolume;
      break;
    case 'cloud':
      storageConfig.cloudProvider = config.uploads.cloudProvider;
      storageConfig.cloudConfig = {
        bucket: config.uploads.cloudConfig?.bucket || '',
        region: config.uploads.cloudConfig?.region,
        credentials: {
          accessKeyId: config.uploads.cloudConfig?.accessKey,
          secretAccessKey: config.uploads.cloudConfig?.secretKey,
          projectId: config.uploads.cloudConfig?.projectId,
        },
      };
      break;
  }

  const storage = createStorageAdapter(storageConfig);

  const uploadService = createUploadService({
    storage,
    defaultFileType: 'image',
    defaultValidationRules: DEFAULT_IMAGE_RULES,
  });

  const controller = createUploadController({
    uploadService,
  });

  return {
    uploadService,
    controller,
    uploadLimits: {
      fileSize: config.uploads.maxFileSize,
      files: config.uploads.maxFiles,
    },
  };
};
