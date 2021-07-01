import * as ts from 'typescript';
import { InsertChange } from '@schematics/angular/utility/change';

import { sourceFileToNodes } from './node';

export function addClassProperty(
  componentPath: string,
  componentSource: ts.SourceFile,
  className: string,
  text: string
): any {
  const nodes = sourceFileToNodes(componentSource);

  let curlyBraceIndex: number;

  for (let i = 0; i < nodes.length; i++) {
    if (
      nodes[i].kind === ts.SyntaxKind.Identifier &&
      nodes[i].getText() === className
    ) {
      do {
        i++;
        if (nodes[i].kind === ts.SyntaxKind.FirstPunctuation) {
          curlyBraceIndex = i;
          break;
        }
      } while (i < nodes.length);
    }
  }

  return new InsertChange(componentPath, nodes[curlyBraceIndex].end, text);
}
