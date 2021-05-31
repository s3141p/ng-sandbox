import { CompilerOptions } from 'typescript';

import { TsConfigWithBaseUrl } from '../types/resolved-ts-config';
import { TsConfig } from '../types/tsconfig';

import {
  alignCompilerOptionsPath,
  alignTsConfigPath,
  generatePathPatch,
} from './align-config-path';

describe('alignTsConfigPath', () => {
  interface Case {
    configWithBaseUrl: TsConfigWithBaseUrl;
    newBaseUrl: string;
    expected: TsConfig;
  }

  const cases: Case[] = [
    {
      configWithBaseUrl: {
        baseUrl: 'apps/app',
        path: 'apps/app/tsconfig.app.json',
        config: {
          files: ['src/main.ts', 'src/polyfills.ts'],
          include: ['src/**/*.d.ts'],
        },
      },
      newBaseUrl: 'discovery',
      expected: {
        files: ['../apps/app/src/main.ts', '../apps/app/src/polyfills.ts'],
        include: ['../apps/app/src/**/*.d.ts'],
      },
    },
    {
      configWithBaseUrl: {
        baseUrl: '.',
        path: 'apps/app/tsconfig.app.json',
        config: {
          files: ['src/main.ts', 'src/polyfills.ts'],
          include: ['src/**/*.d.ts'],
        },
      },
      newBaseUrl: 'discovery',
      expected: {
        files: ['../apps/app/src/main.ts', '../apps/app/src/polyfills.ts'],
        include: ['../apps/app/src/**/*.d.ts'],
      },
    },
  ];

  fdescribe.each(cases)(
    '%# alignTsConfigPath',
    ({ configWithBaseUrl, newBaseUrl, expected }) => {
      it(`should has expected value`, () => {
        expect(alignTsConfigPath(configWithBaseUrl, newBaseUrl)).toEqual(
          expected
        );
      });
    }
  );
});

describe('alignCompilerOptionsPath', () => {
  interface Case {
    options: CompilerOptions;
    pathPatch: string;
    expected: CompilerOptions;
  }

  const cases: Case[] = [
    {
      options: {
        baseUrl: '.',
        paths: {
          '@libB': ['../libB/src/index.ts'],
        },
      },
      pathPatch: '../libs/libA',
      expected: {
        baseUrl: '.',
        paths: {
          '@libB': ['../libs/libB/src/index.ts'],
        },
      },
    },
  ];

  fdescribe.each(cases)(
    '%# alignCompilerOptionsPath',
    ({ options, pathPatch, expected }) => {
      it(`should has expected value`, () => {
        expect(alignCompilerOptionsPath(options, pathPatch)).toEqual(expected);
      });
    }
  );
});

describe('generatePathPatch', () => {
  interface Case {
    to: string;
    from: string;
    expected: string;
  }

  const cases: Case[] = [
    {
      from: 'discovery',
      to: 'libs/libA',
      expected: '../libs/libA',
    },
    {
      from: 'libs',
      to: 'libs/libA',
      expected: 'libA',
    },
    {
      from: 'apps/libA/discovery',
      to: 'libs/group/libA/discovery',
      expected: '../../../libs/group/libA/discovery',
    },
  ];

  describe.each(cases)('%# generatePathDiff', ({ to, from, expected }) => {
    it(`should be equal ${expected}`, () => {
      expect(generatePathPatch(from, to)).toEqual(expected);
    });
  });
});
