import * as fs from 'fs';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { BuilderContext } from '@angular-devkit/architect';

import { resolveSandboxContext } from './sandbox-context-resolve';
import { parseSandboxContext } from './sandbox-context-parse';
import { Sandboxrc } from '../types/sandbox';
import { AppMetadata } from '../../ng/types/app-metadata';
import { LibMetadata } from '../../ng/types/lib-metadata';

jest.mock('./sandbox-context-parse');

describe('resolveSandboxContext', () => {
  const targetLib = 'core-ui-kit';
  const discoveryFolder = 'tmp';

  const buildOptions = { aot: true } as BrowserBuilderOptions;
  const mockRead = jest.spyOn(fs.promises, 'readFile');
  const mockParse = parseSandboxContext as jest.MockedFunction<
    typeof parseSandboxContext
  >;
  let mockMetadata: jest.MockedFunction<BuilderContext['getProjectMetadata']>;
  let mockLogError: jest.MockedFunction<BuilderContext['logger']['error']>;
  let builderContext: jest.Mocked<BuilderContext>;

  beforeEach(() => {
    mockMetadata = jest.fn();
    mockLogError = jest.fn();
    builderContext = {
      getProjectMetadata: mockMetadata,
      target: { project: 'app' },
      logger: {
        error: mockLogError,
      },
    } as any;
  });

  describe('read .ng-sandboxrc', () => {
    describe('success', () => {
      const validSandboxrc: Sandboxrc = {
        libs: [
          {
            libName: 'core-ui-kit',
            discoveryPath: 'discovery.ts',
            tsConfig: 'libs/core-ui-kit/tsconfig.lib.json',
          },
          {
            libName: 'core-components',
            discoveryPath: 'discovery.ts',
            tsConfig: 'libs/core-components/tsconfig.lib.json',
          },
        ],
      };

      beforeEach(() => {
        mockRead.mockImplementationOnce(() => {
          return Promise.resolve(JSON.stringify(validSandboxrc));
        });
      });

      describe('App and Lib Metadata', () => {
        const validAppMetadata: AppMetadata = {
          projectType: 'application',
          root: 'apps/app',
          sourceRoot: 'apps/app/src',
        };

        describe('success', () => {
          const validCoreUiKitMetadata: LibMetadata = {
            projectType: 'library',
            root: 'libs/core-ui-kit',
            sourceRoot: 'libs/core-ui-kit/src',
          };
          const validCoreComponentsMetadata: LibMetadata = {
            projectType: 'library',
            root: 'libs/core-components',
            sourceRoot: 'libs/core-components/src',
          };

          beforeEach(() => {
            mockMetadata.mockImplementation((name: any) => {
              switch (name) {
                case 'app':
                  return Promise.resolve(validAppMetadata) as any;
                case 'core-ui-kit':
                  return Promise.resolve(validCoreUiKitMetadata) as any;
                case 'core-components':
                  return Promise.resolve(validCoreComponentsMetadata) as any;
              }
            });

            mockParse.mockImplementation(() => null);
          });

          it('should data to parse function', async () => {
            expect.assertions(1);

            try {
              await resolveSandboxContext(
                buildOptions,
                builderContext,
                discoveryFolder,
                targetLib
              );
            } catch (e) {
              expect(e).toEqual('');
            }

            expect(mockParse).toHaveBeenCalledWith(
              'app',
              validSandboxrc,
              buildOptions,
              validAppMetadata,
              [validCoreUiKitMetadata, validCoreComponentsMetadata],
              'tmp',
              'core-ui-kit'
            );
          });
        });

        describe('fail', () => {
          const invalidMetadata = {
            root: '',
          };

          it('should log app metadata validation', async () => {
            mockMetadata.mockImplementation(() =>
              Promise.resolve(invalidMetadata)
            );

            expect.assertions(2);

            try {
              await resolveSandboxContext(
                buildOptions,
                builderContext,
                discoveryFolder,
                targetLib
              );
            } catch (e) {
              expect(e).toEqual('');
            }

            expect(mockLogError).toHaveBeenNthCalledWith(
              1,
              'Invalid application definition in angular.json'
            );
          });

          it('should log lib metadata validation errors', async () => {
            mockMetadata
              .mockImplementationOnce(() =>
                Promise.resolve(validAppMetadata as any)
              )
              .mockImplementation(() => Promise.resolve(invalidMetadata));

            expect.assertions(5);

            try {
              await resolveSandboxContext(
                buildOptions,
                builderContext,
                discoveryFolder,
                targetLib
              );
            } catch (e) {
              expect(e).toEqual('');
            }

            expect(mockMetadata).toHaveBeenNthCalledWith(1, 'app');
            expect(mockMetadata).toHaveBeenNthCalledWith(2, 'core-ui-kit');
            expect(mockMetadata).toHaveBeenNthCalledWith(3, 'core-components');
            expect(mockLogError).toHaveBeenNthCalledWith(
              1,
              'Invalid library definition in angular.json'
            );
          });
        });
      });
    });

    describe('fail', () => {
      const invalidDekivtRc = { data: [] };
      beforeEach(() => {
        mockRead.mockImplementationOnce(() => {
          return Promise.resolve(JSON.stringify(invalidDekivtRc)) as any;
        });
      });

      it('should log sandboxrc validation errors', async () => {
        expect.assertions(2);

        try {
          await resolveSandboxContext(
            buildOptions,
            builderContext,
            discoveryFolder,
            targetLib
          );
        } catch (e) {
          expect(e).toEqual('');
        }

        expect(mockLogError).toHaveBeenNthCalledWith(
          1,
          'Invalid .ng-sandboxrc.json:'
        );
      });
    });
  });
});
