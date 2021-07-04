import { resolveTsConfig } from '../../dependencies';
import { generateDiscoveryTsConfig } from '../../shared/functions/generate-discovery-ts-config';
import { SandboxContext } from '../types/sandbox-context';

export function generateTsConfig(sandboxContext: SandboxContext) {
  const appConfig = resolveTsConfig(sandboxContext.buildOptions.tsConfig);
  const libsConfigs = sandboxContext.libsDescriptors.map((item) =>
    resolveTsConfig(item.tsConfig)
  );

  return generateDiscoveryTsConfig(
    appConfig,
    libsConfigs,
    sandboxContext.libsDescriptors,
    sandboxContext.discoveryFolder
  );
}
