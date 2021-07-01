import { resolveTsConfig } from '../../dependencies';
import { generateDiscoveryTsConfig } from '../../shared/functions/generate-discovery-ts-config';
import { DevkitContext } from '../types/devkit-context';

export function generateTsConfig(devkitContext: DevkitContext) {
  const appConfig = resolveTsConfig(devkitContext.buildOptions.tsConfig);
  const libsConfigs = devkitContext.libsDescriptors.map((item) =>
    resolveTsConfig(item.tsConfig)
  );

  return generateDiscoveryTsConfig(
    appConfig,
    libsConfigs,
    devkitContext.libsDescriptors,
    devkitContext.discoveryFolder
  );
}
