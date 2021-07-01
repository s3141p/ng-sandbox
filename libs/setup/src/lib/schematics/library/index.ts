import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';

export function library(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const rc = '.devkitrc.json';

    if (!tree.exists(rc)) {
      tree.create('.devkitrc.json', JSON.stringify({ libs: [] }));
    }

    return tree;
  };
}
