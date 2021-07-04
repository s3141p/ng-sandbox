import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { AppMetadata } from '../../ng/types/app-metadata';
import { LibDescriptor } from '../../shared/types/lib-descriptor';

export interface SandboxContext {
  discoveryConfigPath: string;
  discoveryTsPath: string;
  discoveryFolder: string;
  buildOptions: BrowserBuilderOptions;
  appMeta: AppMetadata;
  libsDescriptors: LibDescriptor[];
}
