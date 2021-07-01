import { Tree } from '@angular-devkit/schematics';
import { getFileContent } from '../file';

export interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export function getPackageJson(host: Tree): PackageJson {
  return JSON.parse(getFileContent(host, 'package.json')) as PackageJson;
}

export function typeToKey(type: 'dev' | 'reg'): string {
  return type === 'dev' ? 'devDependencies' : 'dependencies';
}

export function addDependency(
  host: Tree,
  pkg: string,
  version: string,
  type: 'dev' | 'reg'
): Tree {
  if (host.exists('package.json')) {
    const sourceText = host.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText) as PackageJson;
    const key = typeToKey(type);

    if (!json[key]) {
      json[key] = {};
    }

    if (!json[key][pkg]) {
      json[key][pkg] = version;
      json[key] = sortDependencies(json[key]);
    }

    host.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return host;
}

export function getDependencyVersion(
  tree: Tree,
  name: string,
  type: 'dev' | 'reg'
): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }
  const key = typeToKey(type);

  const packageJson = JSON.parse(
    tree.read('package.json')!.toString('utf8')
  ) as PackageJson;

  if (packageJson[key] && packageJson[key][name]) {
    return packageJson[key][name];
  }

  return null;
}

export function hasDependency(tree: Tree, name: string) {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(
    tree.read('package.json')!.toString('utf8')
  ) as PackageJson;

  return (
    packageJson.dependencies?.[name] ||
    packageJson.devDependencies?.[name] ||
    null
  );
}

export function sortDependencies(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {} as Record<string, string>);
}
