import Ajv from 'ajv';

import { LibOptions } from '../types/lib-options';

export interface Sandboxrc {
  libs: LibOptions[];
}

const sandboxSchema = {
  type: 'object',
  properties: {
    libs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          libName: { type: 'string' },
          tsConfig: { type: 'string' },
          discoveryPath: { type: 'string', default: 'discovery.ts' },
        },
        required: ['discoveryPath', 'libName', 'tsConfig'],
      },
    },
  },
  required: ['libs'],
};

const ajv = new Ajv();
export const sandboxrcValidator = ajv.compile<Sandboxrc>(sandboxSchema);
