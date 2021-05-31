import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { TargetLib } from './target-lib';
import { LibOptions } from './lib-options';

export type BuildOptions = BrowserBuilderOptions & {
  libs: LibOptions[];
  targetLib: TargetLib;
};
