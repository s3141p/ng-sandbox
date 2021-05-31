import * as ts from 'typescript';
import * as path from 'path';

import { mergeInheritedTsConfig } from './merge-inherited-ts-config';
import { TsConfigWithBaseUrl } from '../types/resolved-ts-config';

export function resolveTsConfig(configPath: string): TsConfigWithBaseUrl {
  const { dir } = path.parse(configPath);
  const readResult = ts.readConfigFile(configPath, ts.sys.readFile);

  if (readResult.error) {
    console.log(configPath);
    throw 'Unexpected error during tsconfig.json generation';
  }

  const config = readResult.config;
  const hasParent = !!config.extends;
  const hasBaseUrl = !!config.compilerOptions?.baseUrl;

  if (!hasParent) {
    return {
      config,
      baseUrl: dir === '' ? './' : dir,
      path: configPath,
    };
  }

  const parentPath = path.join(dir, config.extends);
  const parent = resolveTsConfig(parentPath);

  const merged = mergeInheritedTsConfig(parent.config, config);

  return {
    config: merged,
    baseUrl: hasBaseUrl ? dir : parent.baseUrl,
    path: configPath,
  };
}
