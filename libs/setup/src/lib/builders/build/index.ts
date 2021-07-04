import {
  BuilderContext,
  createBuilder,
  BuilderHandlerFn,
} from '@angular-devkit/architect';
import {
  executeBrowserBuilder,
  BrowserBuilderOptions,
} from '@angular-devkit/build-angular';

import { resolveSandboxContext } from '../shared/functions/devkit-context-resolve';
import { generateTsConfig } from '../shared/functions/generate-discovery-items';
import { generateDiscoveryTs } from '../shared/functions/generate-discovery-ts';
import { writeDiscoveryFilesAndClear } from '../shared/functions/save-ts-config';
import { toNgBuildOptions } from '../shared/functions/to-ng-build-options';
import { BuilderExecutor } from '../shared/types/builder-executor';
import { BuildOptions } from '../shared/types/options-build';
import { parseBuildOptions } from './functions/parse-build-options';

const execute = (
  executebBuilder: BuilderExecutor<BrowserBuilderOptions>
): BuilderHandlerFn<BuildOptions> => (
  buildOptions: BuildOptions,
  context: BuilderContext
): Promise<any> => {
  const { targetLib, options } = parseBuildOptions(buildOptions);

  return resolveSandboxContext(options, context, 'tmp', targetLib)
    .then((sandboxContext) => {
      const tsConfig = generateTsConfig(sandboxContext);
      const discoveryTs = generateDiscoveryTs(sandboxContext.libsDescriptors);

      writeDiscoveryFilesAndClear(
        tsConfig,
        discoveryTs,
        sandboxContext.discoveryConfigPath,
        sandboxContext.discoveryTsPath
      );

      return executebBuilder(
        toNgBuildOptions(options, {
          tsConfig: sandboxContext.discoveryConfigPath,
        }),
        context
      ).toPromise();
    })
    .catch((e) => {
      context.logger.error(e);
      throw e;
    });
};

export default createBuilder<BrowserBuilderOptions>(
  execute(executeBrowserBuilder)
);
