import {
  BuilderContext,
  createBuilder,
  BuilderHandlerFn,
  targetFromTargetString,
} from '@angular-devkit/architect';
import {
  BrowserBuilderOptions,
  DevServerBuilderOptions,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { generateTsConfig } from '../shared/functions/generate-discovery-items';
import { generateDiscoveryTs } from '../shared/functions/generate-discovery-ts';

import { writeDiscoveryFilesAndClear } from '../shared/functions/save-ts-config';
import { resolveSandboxContext } from '../shared/functions/sandbox-context-resolve';
import { BuilderExecutor } from '../shared/types/builder-executor';
import { ServeOptions } from '../shared/types/options-serve';
import { overwriteTsConfigPath } from './functions/overwrite-ts-config-path';
import { parseServerOptions } from './functions/parse-serve-options';

const execute = (
  executebBuilder: BuilderExecutor<ServeOptions>
): BuilderHandlerFn<ServeOptions> => (
  serveOptions: ServeOptions,
  context: BuilderContext
): Promise<any> => {
  const { targetLib, options } = parseServerOptions(serveOptions);
  const browserTarget = targetFromTargetString(options.browserTarget);

  return context
    .getTargetOptions(browserTarget)
    .then((buildOptions) =>
      resolveSandboxContext(
        (buildOptions as unknown) as BrowserBuilderOptions,
        context,
        'tmp',
        targetLib
      )
    )
    .then((sandboxContext) => {
      overwriteTsConfigPath(options, sandboxContext, context);

      const tsConfig = generateTsConfig(sandboxContext);
      const discoveryTs = generateDiscoveryTs(sandboxContext.libsDescriptors);

      writeDiscoveryFilesAndClear(
        tsConfig,
        discoveryTs,
        sandboxContext.discoveryConfigPath,
        sandboxContext.discoveryTsPath
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
