import { join, parse } from 'path';

export function generatePathPatch(from: string, to: string): string {
  const fromPath = from.split('/');
  const toPath = to.split('/');
  const min = Math.min(fromPath.length, toPath.length);

  if (from === '' || from === './' || from === '.') {
    return to;
  }

  for (let i = 0; i <= min; i++) {
    if (fromPath[i] !== toPath[i]) {
      const stepsBack = Array(fromPath.length - i).fill('..');
      const startfrom = toPath.slice(i);

      return stepsBack.concat(startfrom).join('/');
    }
  }

  return `Can't destinate from: ${from} to: ${to}`;
}

export function createRelativeToPath(from: string, to: string) {
  const parsed = parse(from);
  const patch = generatePathPatch(parsed.dir, to);

  return join(parsed.dir, patch);
}
