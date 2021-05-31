import { writeFileSync } from 'fs';

import { TsConfig } from '../../../ts/types/tsconfig';

export function writeDiscoveryFilesAndClear(
  config: TsConfig,
  discoveryTs: string,
  tsConfigPath: string,
  tsPath: string
) {
  writeFileSync(tsConfigPath, JSON.stringify(config), { encoding: 'utf8' });
  writeFileSync(tsPath, discoveryTs, { encoding: 'utf8' });
}
