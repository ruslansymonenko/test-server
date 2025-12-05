import { FileValidator, FileValidationRules } from './common';
import { createImageValidator, ImageValidationRules } from './imageValidator';

export type FileType = 'image' | 'document' | 'video' | 'audio' | 'generic';

export interface ValidatorConfig {
  fileType: FileType;
  rules?: FileValidationRules;
}

export const createValidator = (config: ValidatorConfig): FileValidator => {
  switch (config.fileType) {
    case 'image':
      return createImageValidator(config.rules as ImageValidationRules);

    case 'document':
      // TODO: Implement document validator
      // return createDocumentValidator(config.rules);
      throw new Error('Document validator not yet implemented');

    case 'video':
      // TODO: Implement video validator
      // return createVideoValidator(config.rules);
      throw new Error('Video validator not yet implemented');

    case 'audio':
      // TODO: Implement audio validator
      // return createAudioValidator(config.rules);
      throw new Error('Audio validator not yet implemented');

    case 'generic':
      // TODO: Implement generic file validator
      // return createGenericValidator(config.rules);
      throw new Error('Generic validator not yet implemented');

    default:
      throw new Error(`Unknown file type: ${config.fileType}`);
  }
};
