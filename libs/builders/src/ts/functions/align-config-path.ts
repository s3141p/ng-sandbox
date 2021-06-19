import { join, parse } from 'path';
import { CompilerOptions } from 'typescript';

import { TsConfigWithBaseUrl } from '../types/resolved-ts-config';

export function alignTsConfigPath(
  { config, baseUrl, path }: TsConfigWithBaseUrl,
  newBaseUrl: string
) {
  const { dir } = parse(path);
  const compilerOptionsPatch = generatePathPatch(newBaseUrl, baseUrl);
  const filesPatch = generatePathPatch(newBaseUrl, dir);

  if (config.compilerOptions) {
    alignCompilerOptionsPath(config.compilerOptions, compilerOptionsPatch);
  }

  if (config.include) {
    config.include = config.include.map((path) => join(filesPatch, path));
  }

  if (config.files) {
    config.files = config.files.map((path) => join(filesPatch, path));
  }

  return config;
}

export function alignCompilerOptionsPath(
  options: CompilerOptions,
  pathPatch: string
) {
  if (options.paths) {
    const paths = {};

    Object.keys(options.paths).forEach((key) => {
      if (options.paths?.[key]) {
        paths[key] = options.paths[key].map((path) => join(pathPatch, path));
      }
    });

    options.paths = paths;
  }

  return options;
}

export function generatePathPatch(from: string, to: string): string {
  const fromPath = from.split('/');
  const toPath = to.split('/');
  const min = Math.min(fromPath.length, toPath.length);

  for (let i = 0; i <= min; i++) {
    if (fromPath[i] !== toPath[i]) {
      const stepsBack = Array(fromPath.length - i).fill('..');
      const startfrom = toPath.slice(i);

      return stepsBack.concat(startfrom).join('/');
    }
  }

  return `Can't destinate from: ${from} to: ${to}`;
}
