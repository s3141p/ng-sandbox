import { TsConfig } from '../types/tsconfig';

export function mergeInheritedTsConfig(parent: TsConfig, child: TsConfig) {
  const level1ObjectKeys = ['compilerOptions', 'angularCompilerOptions'];

  level1ObjectKeys.forEach((name) => {
    parent[name] = parent[name] || {};
    child[name] = child[name] || {};
  });

  const merged: TsConfig = {
    ...parent,
    ...child,
    compilerOptions: {
      ...parent.compilerOptions,
      ...child.compilerOptions,
    },
    angularCompilerOptions: {
      ...parent.angularCompilerOptions,
      ...child.angularCompilerOptions,
    },
  };

  ['extends'].forEach((key) => {
    delete merged[key];
  });

  level1ObjectKeys.forEach((item) => {
    const hasKeys = Object.keys(merged[item]).length > 0;

    if (!hasKeys) {
      delete merged[item];
    }
  });

  return merged;
}
