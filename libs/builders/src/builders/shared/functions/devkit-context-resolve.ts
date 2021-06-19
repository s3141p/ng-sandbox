import { promises } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { BuilderContext } from '@angular-devkit/architect';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { TargetLib } from '../../shared/types/target-lib';
import { Devkitrc, devkitrcValidator } from '../types/devkitrc';
import { DevkitContext } from '../types/devkit-context';
import { appMetadataValidator } from '../../../ng/types/app-metadata';
import { libMetadataValidator } from '../../../ng/types/lib-metadata';
import { parseDevkitContext } from './devkit-context-parse';

export function resolveDevkitContext(
  buildOptions: BrowserBuilderOptions,
  context: BuilderContext,
  discoveryFolder: string,
  targetLib?: TargetLib
): Promise<DevkitContext> {
  const { logger } = context;

  if (!context.target) {
    logger.error("Can't find application to build/serve");
    throw '';
  }

  if (!targetLib) {
    logger.warn('Application would be builded/served without libs');
  }

  const projectName = context.target.project;
  const devkitrc = promises.readFile(join(cwd(), '.devkitrc.json'), {
    encoding: 'utf8',
  });

  return devkitrc
    .then((file) => JSON.parse(file))
    .then((json) => {
      if (!devkitrcValidator(json)) {
        logger.error('Invalid .devkitrc.json:');
        logger.error(JSON.stringify(devkitrcValidator.errors));

        throw '';
      }

      return json;
    })
    .then((devkitrc: Devkitrc) => {
      const appMeta = context.getProjectMetadata(projectName);
      const libsMeta = devkitrc.libs.map((lib) =>
        context.getProjectMetadata(lib.libName)
      );

      return Promise.all([
        Promise.resolve(devkitrc),
        appMeta,
        Promise.all(libsMeta),
      ]);
    })
    .then(([devkitrc, appMeta, libs]) => {
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

      return parseDevkitContext(
        projectName,
        devkitrc,
        buildOptions,
        appMeta,
        libsMeta,
        discoveryFolder,
        targetLib,
      );
    });
}
