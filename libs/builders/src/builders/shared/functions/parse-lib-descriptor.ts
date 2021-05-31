import { ProjectMetadata } from '../../../ng/types/project-metadata';
import { LibDescriptor } from '../types/lib-descriptor';
import { TargetLib } from '../types/target-lib';
import { LibOptions } from '../types/lib-options';

export function parseLibDescriptors(
  options: LibOptions[],
  meta: ProjectMetadata[],
  lib?: TargetLib
) {
  if (options.length !== meta.length) {
    throw "Options and meta don't match";
  }

  const descriptors = options.map((item, i) => ({ ...item, ...meta[i] }));

  if (lib === 'all') {
    return descriptors;
  }

  if (Array.isArray(lib)) {
    return lib.map((name) => pickDescriptor(name, descriptors));
  }

  if (lib) {
    return [pickDescriptor(lib, descriptors)];
  }

  return [];
}

function pickDescriptor(libName: string, descirptors: LibDescriptor[]) {
  const item = descirptors.find((item) => item.libName === libName);

  if (!item) {
    throw `${libName} wasn't found`;
  }

  return item;
}
