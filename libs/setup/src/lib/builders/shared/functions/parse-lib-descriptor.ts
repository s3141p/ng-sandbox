import { LibDescriptor } from '../types/lib-descriptor';
import { TargetLib } from '../types/target-lib';
import { LibOptions } from '../types/lib-options';
import { LibMetadata } from '../../ng/types/lib-metadata';

export function parseLibDescriptors(
  options: LibOptions[],
  meta: LibMetadata[],
  targetLib?: TargetLib
) {
  const descriptors = options.map((item, i) => toDescriptor(item, meta[i]));

  if (targetLib === 'all') {
    return descriptors;
  }

  if (Array.isArray(targetLib)) {
    return targetLib.map((name) => pickDescriptor(name, descriptors));
  }

  if (targetLib) {
    return [pickDescriptor(targetLib, descriptors)];
  }

  return [];
}

function toDescriptor(option: LibOptions, meta: LibMetadata): LibDescriptor {
  return {
    ...option,
    ...meta,
  };
}

function pickDescriptor(libName: string, descirptors: LibDescriptor[]) {
  const item = descirptors.find((item) => item.libName === libName);

  if (!item) {
    throw `${libName} wasn't found`;
  }

  return item;
}
