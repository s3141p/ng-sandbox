import * as ts from 'typescript';

import { TsConfigWithBaseUrl } from '../types/resolved-ts-config';
import { resolveTsConfig } from './resolve-ts-config';

jest.mock('typescript');

describe('Resolve ts config', () => {
  const mockedRead = ts.readConfigFile as jest.MockedFunction<
    typeof ts.readConfigFile
  >;

  describe('3. Paths in 2', () => {
    const libPath = 'libs/libA/tsconfig.lib.json';

    const libConfig = {
      extends: './tsconfig.json',
    };

    const libParentConfig = {
      extends: '../../tsconfig.base.json',
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libA': ['../libA/src/index.ts'],
          '@libB': ['../libB/src/index.ts'],
        },
      },
    };

    const baseConfig = {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libA': ['libs/libA/src/index.ts'],
          '@libB': ['libs/libB/src/index.ts'],
        },
      },
    };

    const expected: TsConfigWithBaseUrl = {
      config: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['../libA/src/index.ts'],
            '@libB': ['../libB/src/index.ts'],
          },
        },
      },
      path: 'libs/libA/tsconfig.lib.json',
      baseUrl: 'libs/libA',
    };

    beforeEach(() => {
      mockedRead.mockImplementation((fileName: string) => {
        switch (fileName) {
          case 'libs/libA/tsconfig.lib.json':
            return { config: libConfig };
          case 'libs/libA/tsconfig.json':
            return { config: libParentConfig };
          case 'tsconfig.base.json':
            return { config: baseConfig };
        }
      });
    });

    it('should equal', () => {
      const result = resolveTsConfig(libPath);

      expect(result).toEqual(expected);
    });
  });

  describe('3. Paths in 1', () => {
    const libPath = 'libs/libA/tsconfig.lib.json';

    const libConfig = {
      extends: './tsconfig.json',
    };

    const libParentConfig = {
      extends: '../../tsconfig.base.json',
    };

    const baseConfig = {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libA': ['libs/libA/src/index.ts'],
          '@libB': ['libs/libB/src/index.ts'],
        },
      },
    };

    const expected: TsConfigWithBaseUrl = {
      config: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['libs/libA/src/index.ts'],
            '@libB': ['libs/libB/src/index.ts'],
          },
        },
      },
      path: libPath,
      baseUrl: './',
    };

    beforeEach(() => {
      mockedRead.mockImplementation((fileName: string, readFile: unknown) => {
        switch (fileName) {
          case 'libs/libA/tsconfig.lib.json':
            return { config: libConfig };
          case 'libs/libA/tsconfig.json':
            return { config: libParentConfig };
          case 'tsconfig.base.json':
            return { config: baseConfig };
        }
      });
    });

    it('should equal', () => {
      const result = resolveTsConfig(libPath);

      expect(result).toEqual(expected);
    });
  });

  describe('3. Paths in 3', () => {
    const libPath = 'libs/libA/tsconfig.lib.json';

    const libConfig = {
      extends: './tsconfig.json',
      compilerOptions: {
        paths: {
          '@libA': ['../libA/src/index.ts'],
          '@libB': ['../libB/src/index.ts'],
        },
      },
    };

    const libParentConfig = {
      extends: '../../tsconfig.base.json',
      compilerOptions: {
        baseUrl: '.',
      },
    };

    const baseConfig = {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libA': ['libs/libA/src/index.ts'],
          '@libB': ['libs/libB/src/index.ts'],
        },
      },
    };

    const expected: TsConfigWithBaseUrl = {
      config: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['../libA/src/index.ts'],
            '@libB': ['../libB/src/index.ts'],
          },
        },
      },
      path: libPath,
      baseUrl: 'libs/libA',
    };

    beforeEach(() => {
      mockedRead.mockImplementation((fileName: string, readFile: unknown) => {
        switch (fileName) {
          case 'libs/libA/tsconfig.lib.json':
            return { config: libConfig };
          case 'libs/libA/tsconfig.json':
            return { config: libParentConfig };
          case 'tsconfig.base.json':
            return { config: baseConfig };
        }
      });
    });

    it('should equal', () => {
      const result = resolveTsConfig(libPath);

      expect(result).toEqual(expected);
    });
  });

  describe('2. No base Url', () => {
    const libPath = 'libs/libA/tsconfig.lib.json';

    const libConfig = {
      extends: '../../tsconfig.base.json',
      compilerOptions: {},
    };

    const baseConfig = {
      compilerOptions: {},
    };

    const expected: TsConfigWithBaseUrl = {
      config: {},
      path: libPath,
      baseUrl: './',
    };

    beforeEach(() => {
      mockedRead.mockImplementation((fileName: string) => {
        switch (fileName) {
          case 'libs/libA/tsconfig.lib.json':
            return { config: libConfig };
          case 'tsconfig.base.json':
            return { config: baseConfig };
        }
      });
    });

    it('should equal', () => {
      const result = resolveTsConfig(libPath);

      expect(result).toEqual(expected);
    });
  });

  describe('Error', () => {
    beforeEach(() => {
      mockedRead.mockImplementation((fileName: string, readFile: unknown) => {
        return { error: ({ code: '123' } as unknown) as ts.Diagnostic };
      });
    });

    it('should throw error', () => {
      expect(() => resolveTsConfig('foo/bar')).toThrowError(
        'Unexpected error during tsconfig.json generation'
      );
    });
  });
});
