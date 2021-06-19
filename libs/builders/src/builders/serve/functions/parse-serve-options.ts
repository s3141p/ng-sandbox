import { DevServerBuilderOptions } from '@angular-devkit/build-angular';

import { ServeOptions } from '../../shared/types/options-serve';
import { TargetLib } from '../../shared/types/target-lib';

export function parseServerOptions({
  targetLib,
  ...options
}: ServeOptions): {
  targetLib?: TargetLib;
  options: DevServerBuilderOptions;
} {
  options.port = options.port || 4200;
  options.watch = options.watch || true;
  options.host = options.host || 'localhost';

  return { targetLib, options };
}
