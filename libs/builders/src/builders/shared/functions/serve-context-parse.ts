import { join } from 'path';
import { JsonObject } from '@angular-devkit/core';

import { ProjectMetadata } from '../../../ng/types/project-metadata';
import { generateDiscoveryTsConfigPath } from '../../shared/functions/generate-discovery-config-name';
import { parseLibDescriptors } from '../../shared/functions/parse-lib-descriptor';
import { DevkitContext } from '../types/devkit-context';
import { BuildOptions } from '../../shared/types/options-build';
import { TargetLib } from '../../shared/types/target-lib';

export function parseDevkitContext(
  projectName: string,
  targetLib: TargetLib,
  discoveryFolder: string,
  buildOptions: BuildOptions,
  appMeta: JsonObject,
  libsMeta: JsonObject[]
): DevkitContext {
  return ({
    buildOptions,
    appMeta,
    libsDescriptors: parseLibDescriptors(
      buildOptions.libs,
      (libsMeta as unknown) as ProjectMetadata[],
      targetLib
    ),
    discoveryFolder: discoveryFolder,
    discoveryTsPath: join(discoveryFolder, 'discovery.ts'),
    discoveryConfigPath: generateDiscoveryTsConfigPath(
      discoveryFolder,
      projectName
    ),
  } as unknown) as DevkitContext;
}
