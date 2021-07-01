import { BrowserBuilderOptions } from '@angular-devkit/build-angular';

import { BuildOptions } from '../../shared/types/options-build';
import { TargetLib } from '../../shared/types/target-lib';

export function parseBuildOptions({
  targetLib,
  ...options
}: BuildOptions): {
  targetLib?: TargetLib;
  options: BrowserBuilderOptions;
} {
  return { targetLib, options };
}
