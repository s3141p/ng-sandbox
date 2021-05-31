import { JsonObject } from '@angular-devkit/core';
import { LibDescriptor } from '../../shared/types/lib-descriptor';

import { BuildOptions } from '../../shared/types/options-build';

export function parseBuildOptions(
  options: BuildOptions | JsonObject
): BuildOptions {
  options.libs = (options.libs as LibDescriptor[]) || [];
  options.libs = options.libs.map((lib) => {
    lib.discoveryPath = lib.discoveryPath || 'discovery.ts';
    return lib;
  });

  return options as BuildOptions;
}
