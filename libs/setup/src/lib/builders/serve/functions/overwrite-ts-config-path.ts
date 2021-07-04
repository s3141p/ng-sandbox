import {
  BuilderContext,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { JsonObject } from '@angular-devkit/core';

import { isBuildOptions } from '../../ng/functions/parse-browser-build-options';
import { sameTargets } from '../../ng/functions/same-targets';
import { toNgBuildOptions } from '../../shared/functions/to-ng-build-options';
import { SandboxContext } from '../../shared/types/sandbox-context';

export function overwriteTsConfigPath(
  options: DevServerBuilderOptions,
  serveContext: SandboxContext,
  context: BuilderContext
) {
  const browserTarget = targetFromTargetString(options.browserTarget);
  const targetOptions = context.getTargetOptions;

  context.getTargetOptions = (target) => {
    const options = targetOptions(target);
    const isNotSame = !sameTargets(target, browserTarget);

    return isNotSame
      ? options
      : options.then((item) => {
          if (isBuildOptions(item)) {
            const options = toNgBuildOptions(item, {
              tsConfig: serveContext.discoveryConfigPath,
            });

            return (options as unknown) as JsonObject;
          }

          return item;
        });
  };
}
