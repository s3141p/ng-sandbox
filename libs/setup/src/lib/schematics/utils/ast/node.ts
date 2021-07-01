import * as ts from 'typescript';

export function sourceFileToNodes(sourceFile: ts.SourceFile): ts.Node[] {
  const nodes: ts.Node[] = [sourceFile];
  const result: ts.Node[] = [];

  while (nodes.length > 0) {
    const node = nodes.shift();

    if (node) {
      result.push(node);
      if (node.getChildCount(sourceFile) >= 0) {
        nodes.unshift(...node.getChildren());
      }
    }
  }

  return result;
}

export function getFunctionCallNode(
  nodes: ts.Node[],
  functionName: string
): ts.CallExpression | null {
  let funcCall: ts.CallExpression | null = null;

  for (const node of nodes) {
    let callNode: ts.Node | null = null;
    callNode = findNode(node, ts.SyntaxKind.Identifier, functionName);

    while (
      callNode &&
      callNode.parent &&
      callNode.parent.kind !== ts.SyntaxKind.CallExpression
    ) {
      callNode = callNode.parent;
    }

    if (
      callNode !== null &&
      callNode.parent !== undefined &&
      callNode.parent.kind === ts.SyntaxKind.CallExpression
    ) {
      funcCall = callNode.parent as ts.CallExpression;
      break;
    }
  }

  return funcCall;
}

export function findNode(
  node: ts.Node,
  kind: ts.SyntaxKind,
  text: string
): ts.Node | null {
  if (node.kind === kind && node.getText() === text) {
    return node;
  }

  let foundNode: ts.Node | null = null;
  ts.forEachChild(node, (childNode) => {
    foundNode = foundNode || findNode(childNode, kind, text);
  });

  return foundNode;
}
