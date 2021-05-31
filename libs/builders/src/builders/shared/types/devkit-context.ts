import { ProjectMetadata } from '../../../ng/types/project-metadata';
import { LibDescriptor } from '../../shared/types/lib-descriptor';
import { BuildOptions } from '../../shared/types/options-build';

export interface DevkitContext {
  discoveryConfigPath: string;
  discoveryTsPath: string;
  discoveryFolder: string;
  buildOptions: BuildOptions;
  appMeta: ProjectMetadata;
  libsDescriptors: LibDescriptor[];
}
