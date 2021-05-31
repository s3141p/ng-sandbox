import {
  BuilderContext,
  createBuilder,
  BuilderHandlerFn,
  targetFromTargetString,
} from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { generateTsConfig } from '../shared/functions/generate-discovery-items';
import { generateDiscoveryTs } from '../shared/functions/generate-discovery-ts';
import { parseBuildOptions } from '../shared/functions/parse-build-options';

import { writeDiscoveryFilesAndClear } from '../shared/functions/save-ts-config';
import { resolveDevkitContext } from '../shared/functions/serve-context-resolve';
import { BuilderExecutor } from '../shared/types/builder-executor';
import { ServeOptions } from '../shared/types/options-serve';
import { overwriteTsConfigPath } from './functions/overwrite-ts-config-path';
import { parseServerOptions } from './functions/parse-serve-options';

const execute = (
  executebBuilder: BuilderExecutor<ServeOptions>
): BuilderHandlerFn<ServeOptions> => (
  options: ServeOptions,
  context: BuilderContext
): Promise<any> => {
  const browserTarget = targetFromTargetString(options.browserTarget);
  const serveOptions = parseServerOptions(options);

  return context
    .getTargetOptions(browserTarget)
    .then((value) => parseBuildOptions(value))
    .then((buildOptions) =>
      resolveDevkitContext(serveOptions.targetLib, 'tmp', buildOptions, context)
    )
    .then((devkitContext) => {
      overwriteTsConfigPath(options, devkitContext, context);

      const tsConfig = generateTsConfig(devkitContext);
      const discoveryTs = generateDiscoveryTs(devkitContext.libsDescriptors);

      writeDiscoveryFilesAndClear(
        tsConfig,
        discoveryTs,
        devkitContext.discoveryConfigPath,
        devkitContext.discoveryTsPath
      );

      return executebBuilder(options, context).toPromise();
    })
    .catch((e) => {
      context.logger.error(e);
      throw e;
    });
};

export default createBuilder<DevServerBuilderOptions>(
  execute(executeDevServerBuilder)
);
