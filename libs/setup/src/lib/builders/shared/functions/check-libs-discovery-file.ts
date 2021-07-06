import { access } from 'fs/promises';
import { constants } from 'fs';
import { join } from 'path';

import { LibDescriptor } from '../types/lib-descriptor';

export async function checkLibrariesDiscoveryFiles(
  libs: LibDescriptor[]
): Promise<void> {
  return Promise.all(libs.map((item) => checkLibraryDiscoveryFile(item))).then(
    () => {
      /** noop */
    }
  );
}

export async function checkLibraryDiscoveryFile(lib: LibDescriptor) {
  const path = join(lib.sourceRoot, lib.discoveryPath);

  return access(path, constants.R_OK).catch(() => {
    throw new Error(
      `Discovery file for '${lib.libName}' library is not exist: ${path}`
    );
  });
}
