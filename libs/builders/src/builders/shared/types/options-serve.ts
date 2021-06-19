import { DevServerBuilderOptions } from '@angular-devkit/build-angular';

import { TargetLib } from './target-lib';

export type ServeOptions = DevServerBuilderOptions & {
  targetLib?: TargetLib;
};
