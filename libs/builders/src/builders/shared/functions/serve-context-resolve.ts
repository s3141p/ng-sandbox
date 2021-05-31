import { BuilderContext } from '@angular-devkit/architect';
import { BuildOptions } from '../../shared/types/options-build';

import { TargetLib } from '../../shared/types/target-lib';
import { DevkitContext } from '../types/devkit-context';
import { parseDevkitContext } from './serve-context-parse';

export function resolveDevkitContext(
  targetLib: TargetLib,
  discoveryFolder: string,
  buildOptions: BuildOptions,
  context: BuilderContext
): Promise<DevkitContext> {
  const projectName = context.target.project;
  const appMeta = context.getProjectMetadata(projectName);
  const libsMeta = buildOptions.libs.map((lib) =>
    context.getProjectMetadata(lib.libName)
  );

  return Promise.all([appMeta, ...libsMeta]).then(([appMeta, ...libs]) =>
    parseDevkitContext(
      projectName,
      targetLib,
      discoveryFolder,
      buildOptions,
      appMeta,
      libs
    )
  );
}
