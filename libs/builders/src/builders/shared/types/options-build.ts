import { BrowserBuilderOptions } from '@angular-devkit/build-angular';
import { TargetLib } from './target-lib';

export type BuildOptions = BrowserBuilderOptions & {
  targetLib?: TargetLib;
};
