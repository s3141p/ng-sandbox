import { join } from 'path';

export function generateDiscoveryTsConfigPath(folder: string, appName: string) {
  return join(folder, `tsconfig.${appName}.json`);
}
