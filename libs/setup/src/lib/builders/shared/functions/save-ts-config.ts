import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { parse } from 'path';

import { TsConfig } from '../../dependencies';

export function writeDiscoveryFilesAndClear(
  config: TsConfig,
  discoveryTs: string,
  tsConfigPath: string,
  discoveryPath: string
) {
  const tsConfigDir = parse(tsConfigPath).dir;
  const discoveryDir = parse(discoveryPath).dir;

  if (!existsSync(tsConfigDir)) {
    mkdirSync(tsConfigDir);
  }

  if (!existsSync(discoveryDir)) {
    mkdirSync(discoveryDir);
  }

  writeFileSync(tsConfigPath, JSON.stringify(config), { encoding: 'utf8' });
  writeFileSync(discoveryPath, discoveryTs, { encoding: 'utf8' });
}
