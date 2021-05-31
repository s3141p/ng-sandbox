import {
  BuilderContext,
  createBuilder,
  BuilderHandlerFn,
} from '@angular-devkit/architect';
import {
  executeBrowserBuilder,
  BrowserBuilderOptions,
} from '@angular-devkit/build-angular';

import { generateTsConfig } from '../shared/functions/generate-discovery-items';
import { generateDiscoveryTs } from '../shared/functions/generate-discovery-ts';
import { parseBuildOptions } from '../shared/functions/parse-build-options';
import { writeDiscoveryFilesAndClear } from '../shared/functions/save-ts-config';
import { resolveDevkitContext } from '../shared/functions/serve-context-resolve';
import { toNgBuildOptions } from '../shared/functions/to-ng-build-options';
import { BuilderExecutor } from '../shared/types/builder-executor';
import { BuildOptions } from '../shared/types/options-build';

const execute = (
  executebBuilder: BuilderExecutor<BrowserBuilderOptions>
): BuilderHandlerFn<BuildOptions> => (
  options: BuildOptions,
  context: BuilderContext
): Promise<any> => {
  const buildOptions = parseBuildOptions(options);

  return resolveDevkitContext(options.targetLib, 'tmp', buildOptions, context)
    .then((devkitContext) => {
      const tsConfig = generateTsConfig(devkitContext);
      const discoveryTs = generateDiscoveryTs(devkitContext.libsDescriptors);

      writeDiscoveryFilesAndClear(
        tsConfig,
        discoveryTs,
        devkitContext.discoveryConfigPath,
        devkitContext.discoveryTsPath
      );

      return executebBuilder(
        toNgBuildOptions(options, {
          tsConfig: devkitContext.discoveryConfigPath,
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
