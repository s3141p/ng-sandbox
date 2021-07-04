import { promises } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { BuilderContext } from '@angular-devkit/architect';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { TargetLib } from '../../shared/types/target-lib';
import { Sandboxrc, sandboxrcValidator } from '../types/sandbox';
import { SandboxContext } from '../types/sandbox-context';
import { appMetadataValidator } from '../../ng/types/app-metadata';
import { libMetadataValidator } from '../../ng/types/lib-metadata';
import { parseSandboxContext } from './sandbox-context-parse';

export function resolveSandboxContext(
  buildOptions: BrowserBuilderOptions,
  context: BuilderContext,
  discoveryFolder: string,
  targetLib?: TargetLib
): Promise<SandboxContext> {
  const { logger } = context;

  if (!context.target) {
    logger.error("Can't find application to build/serve");
    throw '';
  }

  if (!targetLib) {
    logger.warn('Application would be builded/served without libs');
  }

  const projectName = context.target.project;
  const sandboxrc = promises.readFile(join(cwd(), '.ng-sandboxrc.json'), {
    encoding: 'utf8',
  });

  return sandboxrc
    .then((file) => JSON.parse(file))
    .then((json) => {
      if (!sandboxrcValidator(json)) {
        logger.error('Invalid .ng-sandboxrc.json:');
        logger.error(JSON.stringify(sandboxrcValidator.errors));

        throw '';
      }

      return json;
    })
    .then((sandboxrc: Sandboxrc) => {
      const appMeta = context.getProjectMetadata(projectName);
      const libsMeta = sandboxrc.libs.map((lib) =>
        context.getProjectMetadata(lib.libName)
      );

      return Promise.all([
        Promise.resolve(sandboxrc),
        appMeta,
        Promise.all(libsMeta),
      ]);
    })
    .then(([sandboxrc, appMeta, libs]) => {
      if (!appMetadataValidator(appMeta)) {
        logger.error('Invalid application metadata:');
        logger.error(JSON.stringify(appMetadataValidator.errors));

        throw '';
      }

      const libsMeta = libs.map((item) => {
        if (!libMetadataValidator(item)) {
          logger.error('Invalid library metadata:');
          logger.error(JSON.stringify(libMetadataValidator.errors));

          throw '';
        }
        return item;
      });

      return parseSandboxContext(
        projectName,
        sandboxrc,
        buildOptions,
        appMeta,
        libsMeta,
        discoveryFolder,
        targetLib
      );
    });
}
