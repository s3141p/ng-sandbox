import Ajv from 'ajv';

export interface AppMetadata {
  root: string;
  sourceRoot: string;
  projectType: 'application';
}

const appMetaSchema = {
  type: 'object',
  properties: {
    root: { type: 'string' },
    sourceRoot: { type: 'string' },
    projectType: { type: 'string', enum: ['application'] },
  },
  required: ['root', 'sourceRoot', 'projectType'],
};

const ajv = new Ajv();
export const appMetadataValidator = ajv.compile<AppMetadata>(appMetaSchema);
