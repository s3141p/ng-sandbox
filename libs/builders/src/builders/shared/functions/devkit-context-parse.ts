import { join } from 'path';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { AppMetadata } from '../../../ng/types/app-metadata';
import { generateDiscoveryTsConfigPath } from '../../shared/functions/generate-discovery-config-name';
import { parseLibDescriptors } from '../../shared/functions/parse-lib-descriptor';
import { DevkitContext } from '../types/devkit-context';
import { TargetLib } from '../../shared/types/target-lib';
import { Devkitrc } from '../types/devkitrc';
import { LibMetadata } from '../../../ng/types/lib-metadata';

export function parseDevkitContext(
  projectName: string,
  devkitrc: Devkitrc,
  buildOptions: BrowserBuilderOptions,
  appMeta: AppMetadata,
  libsMeta: LibMetadata[],
  discoveryFolder: string,
  targetLib?: TargetLib
): DevkitContext {
  return {
    buildOptions,
    appMeta,
    libsDescriptors: parseLibDescriptors(devkitrc.libs, libsMeta, targetLib),
    discoveryFolder: discoveryFolder,
    discoveryTsPath: join(discoveryFolder, 'discovery.ts'),
    discoveryConfigPath: generateDiscoveryTsConfigPath(
      discoveryFolder,
      projectName
    ),
  };
}
