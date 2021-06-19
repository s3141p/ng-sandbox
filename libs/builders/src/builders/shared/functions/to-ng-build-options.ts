import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

export function toNgBuildOptions(
  options: BrowserBuilderOptions,
  overwrite: Partial<BrowserBuilderOptions> = {}
): BrowserBuilderOptions {
  return {
    ...options,
    ...overwrite,
  };
}
