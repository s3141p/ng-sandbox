import { Tree } from '@angular-devkit/schematics';

export function getFileContent(tree: Tree, filePath: string): string {
  const buffer = tree.read(filePath);

  if (!buffer) {
    throw new Error(`Cannot read "${filePath}" because it does not exist.`);
  }

  return buffer.toString();
}
