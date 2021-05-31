import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { BuildOptions } from '../../shared/types/options-build';

export function toNgBuildOptions(
  options: BuildOptions,
  overwrite: Partial<BrowserBuilderOptions> = {}
): BrowserBuilderOptions {
  const result = {
    ...options,
    ...overwrite
  }

  delete result.libs;
  delete result.targetLib;

  return result;
}
