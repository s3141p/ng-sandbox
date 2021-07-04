import { ModuleKind, ModuleResolutionKind, ScriptTarget } from 'typescript';

import { TsConfigWithBaseUrl, TsConfig } from '../../dependencies';
import { LibDescriptor } from '../types/lib-descriptor';
import { generateDiscoveryTsConfig } from './generate-discovery-ts-config';

describe('generateDiscoveryTsConfig', () => {
  interface Case {
    app: TsConfigWithBaseUrl;
    libs: TsConfigWithBaseUrl[];
    libsDescriptors: LibDescriptor[];
    discoveryFolder: string;
    expected: TsConfig;
  }

  const case0: Case = {
    app: {
      config: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@ng-sandbox/discovery': ['./src/discovery.ts'],
          },
        },
        files: ['src/main.ts', 'src/polyfills.ts'],
        include: ['src/**/*.d.ts'],
      },
      path: 'apps/app/tsconfig.app.json',
      baseUrl: 'apps/app',
    },
    libs: [
      {
        path: 'libs/libA/tsconfig.lib.json',
        baseUrl: 'libs/libA',
        config: {
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@libB': ['../libB/src/index.ts'],
            },
          },
        },
      },
    ],
    libsDescriptors: [
      {
        libName: 'libA',
        tsConfig: 'libs/libA/tsconfig.lib.json',
        discoveryPath: 'discovery.ts',
        root: 'libs/libA',
        sourceRoot: 'libs/libA/src',
        projectType: 'library',
      },
    ],
    discoveryFolder: 'discovery',
    expected: {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libB': ['../libs/libB/src/index.ts'],
          '@discovery/libA': ['../libs/libA/src/discovery.ts'],
          '@ng-sandbox/discovery': ['discovery.ts'],
        },
      },
      include: ['../apps/app/src/**/*.d.ts'],
      files: ['../apps/app/src/main.ts', '../apps/app/src/polyfills.ts'],
    },
  };

  const case1: Case = {
    app: {
      config: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@ng-sandbox/discovery': ['./src/discovery.ts'],
            '@libB': ['../../libs/libB/src/index.ts'],
            '@libC': ['../../libs/libC/src/index.ts'],
          },
        },
        files: ['src/main.ts', 'src/polyfills.ts'],
        include: ['src/**/*.d.ts'],
      },
      baseUrl: 'apps/app',
      path: 'apps/app/tsconfig.app.json',
    },
    libs: [
      {
        baseUrl: 'libs/libA',
        path: 'libs/libA/tsconfig.lib.json',
        config: {
          compilerOptions: {
            baseUrl: '.',
            paths: {
              '@libB': ['../fake/path/index.ts'],
              '@libD': ['../libD/src/index.ts'],
            },
          },
        },
      },
    ],
    libsDescriptors: [
      {
        libName: 'libA',
        tsConfig: 'libs/libA/tsconfig.lib.json',
        discoveryPath: 'discovery.ts',
        root: 'libs/libA',
        sourceRoot: 'libs/libA/src',
        projectType: 'library',
      },
    ],
    discoveryFolder: 'discovery',
    expected: {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@libB': ['../libs/libB/src/index.ts'],
          '@libC': ['../libs/libC/src/index.ts'],
          '@libD': ['../libs/libD/src/index.ts'],
          '@discovery/libA': ['../libs/libA/src/discovery.ts'],
          '@ng-sandbox/discovery': ['discovery.ts'],
        },
      },
      include: ['../apps/app/src/**/*.d.ts'],
      files: ['../apps/app/src/main.ts', '../apps/app/src/polyfills.ts'],
    },
  };

  const case2: Case = {
    app: {
      config: {
        compilerOptions: {
          rootDir: '.',
          outDir: '.',
          baseUrl: '.',
          sourceMap: true,
          declaration: false,
          moduleResolution: ModuleResolutionKind.NodeJs,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          importHelpers: true,
          target: ScriptTarget.ES2015,
          module: ModuleKind.ESNext,
          lib: ['es2017', 'dom'],
          skipLibCheck: true,
          skipDefaultLibCheck: true,
          forceConsistentCasingInFileNames: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          paths: {
            '@ng-sandbox/discovery': ['./src/discovery.ts'],
            '@libB': ['../../libs/libB/src/index.ts'],
            '@libC': ['../../libs/libC/src/index.ts'],
          },
        },
        angularCompilerOptions: {
          strictInjectionParameters: true,
          strictInputAccessModifiers: true,
          strictTemplates: true,
        },
        files: ['src/main.ts', 'src/polyfills.ts'],
        include: ['src/**/*.d.ts'],
      },
      baseUrl: 'apps/app',
      path: 'apps/app/tsconfig.app.json',
    },
    libs: [
      {
        baseUrl: 'libs/libA',
        path: 'libs/libA/tsconfig.lib.json',
        config: {
          compilerOptions: {
            baseUrl: '.',

            paths: {
              '@libB': ['../fake/path/index.ts'],
              '@libD': ['../libD/src/index.ts'],
            },
          },
        },
      },
    ],
    libsDescriptors: [
      {
        libName: 'libA',
        tsConfig: 'libs/libA/tsconfig.lib.json',
        discoveryPath: 'discovery.ts',
        root: 'libs/libA',
        sourceRoot: 'libs/libA/src',
        projectType: 'library',
      },
    ],
    discoveryFolder: 'discovery',
    expected: {
      compilerOptions: {
        baseUrl: '.',
        sourceMap: true,
        declaration: false,
        moduleResolution: ModuleResolutionKind.NodeJs,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        importHelpers: true,
        target: ScriptTarget.ES2015,
        module: ModuleKind.ESNext,
        lib: ['es2017', 'dom'],
        skipLibCheck: true,
        skipDefaultLibCheck: true,
        forceConsistentCasingInFileNames: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        paths: {
          '@libB': ['../libs/libB/src/index.ts'],
          '@libC': ['../libs/libC/src/index.ts'],
          '@libD': ['../libs/libD/src/index.ts'],
          '@discovery/libA': ['../libs/libA/src/discovery.ts'],
          '@ng-sandbox/discovery': ['discovery.ts'],
        },
      },
      angularCompilerOptions: {
        strictInjectionParameters: true,
        strictInputAccessModifiers: true,
        strictTemplates: true,
      },
      include: ['../apps/app/src/**/*.d.ts'],
      files: ['../apps/app/src/main.ts', '../apps/app/src/polyfills.ts'],
    },
  };

  const cases: Case[] = [case0, case1, case2];

  describe.each(cases)(
    '%# generateDiscoveryTsConfig',
    ({ app, libs, libsDescriptors, discoveryFolder, expected }) => {
      it('should has expected value', () => {
        expect(
          generateDiscoveryTsConfig(app, libs, libsDescriptors, discoveryFolder)
        ).toEqual(expected);
      });
    }
  );
});
