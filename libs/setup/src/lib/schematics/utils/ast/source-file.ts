import * as ts from 'typescript';
import { SchematicsException, Tree } from '@angular-devkit/schematics';

export function createSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);

  if (!buffer) {
    throw new SchematicsException(`File (${path}) not found`);
  }

  const main = buffer.toString('utf-8');
  return ts.createSourceFile(path, main, ts.ScriptTarget.Latest, true);
}
