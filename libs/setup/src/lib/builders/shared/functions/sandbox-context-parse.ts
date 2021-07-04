import { join } from 'path';
import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { AppMetadata } from '../../ng/types/app-metadata';
import { generateDiscoveryTsConfigPath } from '../../shared/functions/generate-discovery-config-name';
import { parseLibDescriptors } from '../../shared/functions/parse-lib-descriptor';
import { SandboxContext } from '../types/sandbox-context';
import { TargetLib } from '../../shared/types/target-lib';
import { Sandboxrc } from '../types/sandbox';
import { LibMetadata } from '../../ng/types/lib-metadata';

export function parseSandboxContext(
  projectName: string,
  sandboxrc: Sandboxrc,
  buildOptions: BrowserBuilderOptions,
  appMeta: AppMetadata,
  libsMeta: LibMetadata[],
  discoveryFolder: string,
  targetLib?: TargetLib
): SandboxContext {
  return {
    buildOptions,
    appMeta,
    libsDescriptors: parseLibDescriptors(sandboxrc.libs, libsMeta, targetLib),
    discoveryFolder: discoveryFolder,
    discoveryTsPath: join(discoveryFolder, 'discovery.ts'),
    discoveryConfigPath: generateDiscoveryTsConfigPath(
      discoveryFolder,
      projectName
    ),
  };
}
