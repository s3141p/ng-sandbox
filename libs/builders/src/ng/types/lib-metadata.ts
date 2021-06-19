import Ajv from 'ajv';

export interface LibMetadata {
  root: string;
  sourceRoot: string;
  projectType: 'library';
}

const libMetadataSchema = {
  type: 'object',
  properties: {
    root: { type: 'string' },
    sourceRoot: { type: 'string' },
    projectType: { type: 'string', enum: ['library'] },
  },
  required: ['root', 'sourceRoot', 'projectType'],
};

const ajv = new Ajv();
export const libMetadataValidator = ajv.compile<LibMetadata>(libMetadataSchema);
