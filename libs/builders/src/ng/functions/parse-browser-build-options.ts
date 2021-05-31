import { BuildOptions } from '../../builders/shared/types/options-build';

export function isBuildOptions(
  options: BuildOptions | unknown
): options is BuildOptions {
  return !!(options as BuildOptions).tsConfig;
}
