import { JsonObject } from '@angular-devkit/core';
import { ServeOptions } from '../../shared/types/options-serve';

export function parseServerOptions(
  options: ServeOptions | JsonObject
): ServeOptions {
  options.port = options.port || 4200;
  options.watch = options.watch || true;
  options.host = options.host || 'localhost';

  return options as ServeOptions;
}
