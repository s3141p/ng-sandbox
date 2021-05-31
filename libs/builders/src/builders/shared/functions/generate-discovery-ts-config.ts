import { join } from 'path';

import { alignTsConfigPath } from '../../../ts/functions/align-config-path';
import { TsConfigWithBaseUrl } from '../../../ts/types/resolved-ts-config';
import { TsConfig } from '../../../ts/types/tsconfig';
import { LibDescriptor } from '../types/lib-descriptor';
import { generateDiscoveryLibImportName } from './generate-lib-import-name';

export function generateDiscoveryTsConfig(
  app: TsConfigWithBaseUrl,
  libs: TsConfigWithBaseUrl[],
  libsDescriptors: LibDescriptor[],
  discoveryFolder: string
) {
  const appConfig = alignTsConfigPath(app, discoveryFolder);
  const libsPaths = libs.reduce((accum, item) => {
    const config = alignTsConfigPath(item, discoveryFolder);
    if (config.compilerOptions) {
      return { ...accum, ...config.compilerOptions.paths };
    }
  }, {});

  const appCompilerOptions = appConfig.compilerOptions || {};

  const libsDiscoveryPath = libsDescriptors.reduce((accum, item) => {
    accum[generateDiscoveryLibImportName(item.libName)] = [
      join('..', item.sourceRoot, item.discoveryPath),
    ];

    return accum;
  }, {});

  const paths = {
    ...libsPaths,
    ...(appConfig.compilerOptions?.paths || {}),
    ...libsDiscoveryPath,
    '@devkit/discovery': ['discovery.ts'],
  };

  const discoveryConfig: TsConfig = {
    compilerOptions: {
      ...appCompilerOptions,
      baseUrl: '.',
      paths,
    },
    include: appConfig.include || [],
    files: appConfig.files || [],
  };

  if (appConfig.angularCompilerOptions) {
    discoveryConfig.angularCompilerOptions = appConfig.angularCompilerOptions;
  }

  ['outDir', 'rootDir'].forEach((key) => {
    delete discoveryConfig.compilerOptions[key];
  });

  return discoveryConfig;
}
