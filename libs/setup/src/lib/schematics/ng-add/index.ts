import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { join } from 'path';

import { addDependency, hasDependency } from '../utils/package-json';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const range = '0.1.1';
    const components = '@ui-devkit/components';
    const builders = '@ui-devkit/builders';

    if (!hasDependency(tree, components)) {
      addDependency(tree, components, range, 'dev');
    }

    if (!hasDependency(tree, builders)) {
      addDependency(tree, builders, range, 'dev');
    }

    const app = new RunSchematicTask('@schematics/angular', 'application', {
      name: options.project,
      skipInstall: true,
      routing: false,
      style: options.style,
      projectRoot: join(options.projectRoot, options.project),
    });

    const material = new RunSchematicTask('@angular/material', 'ng-add', {
      project: options.project,
      typography: true,
      animations: true,
    });

    const setup = new RunSchematicTask('ng-add-setup-project', options);

    const appId = context.addTask(app);
    const matId = context.addTask(material, [appId]);
    const setupId = context.addTask(setup, [matId]);

    return tree;
  };
}
