import { BuilderContext } from '@angular-devkit/architect';
import { Observable } from 'rxjs';

export type BuilderExecutor<O extends unknown> = (
  options: O,
  context: BuilderContext
) => Observable<unknown>;
