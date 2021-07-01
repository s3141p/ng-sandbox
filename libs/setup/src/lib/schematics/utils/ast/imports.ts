import { SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { findNode, getFunctionCallNode } from './node';

export function getImportPathOfFunctionArgument(nodes: ts.Node[], fn: string) {
  const fnCall = getFunctionCallNode(nodes, fn);

  if (!fnCall) {
    throw new SchematicsException('Bootstrap call not found');
  }

  const argument = fnCall.arguments[0];

  return getImportPathByToken(nodes, argument.getText());
}

export function getImportPathByToken(nodes: ts.Node[], importToken: string) {
  return nodes
    .filter(ts.isImportDeclaration)
    .filter((node) => findNode(node, ts.SyntaxKind.Identifier, importToken))
    .map((node) => {
      const modulePath = node.moduleSpecifier as ts.StringLiteral;
      return modulePath.text;
    })[0];
}
