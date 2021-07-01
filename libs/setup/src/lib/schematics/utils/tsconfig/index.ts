import * as ts from 'typescript';
import * as path from 'path';
import { Tree } from '@angular-devkit/schematics';

import { getFileContent } from '../file';
import { TsConfig } from '../../dependencies';

export function findRootTsConfig(
  tree: Tree,
  configPath: string
): { path: string; config: TsConfig } {
  const readResult = ts.readConfigFile(configPath, (path) =>
    getFileContent(tree, path)
  );

  if (readResult.error) {
    throw `tsc Can't read/parse ${configPath}`;
  }

  const config = readResult.config;
  const hasPaths = !!config.compilerOptions?.paths;
  const hasParent = !!config.extends;

  if (hasPaths) {
    return { path: configPath, config };
  }

  if (hasParent) {
    const parentPath = path.join(path.parse(configPath).dir, config.extends);
    return findRootTsConfig(tree, parentPath);
  }

  return { path: configPath, config };
}