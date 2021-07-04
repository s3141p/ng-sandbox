import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import { join } from 'path';

import {
  addDependency,
  getDependencyVersion,
  hasDependency,
} from '../utils/package-json';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const range = '^0.2.0';
    const componentsPackage = '@ng-sandbox/components';
    const materialPackage = '@angular/material';
    const angularRange = getDependencyVersion(tree, '@angular/core', 'reg');
    const materialRange = angularRange || '^12.0.0';

    if (!hasDependency(tree, componentsPackage)) {
      addDependency(tree, componentsPackage, range, 'dev');
    }

    if (!hasDependency(tree, materialPackage)) {
      addDependency(tree, materialPackage, materialRange, 'reg');
    }

    const installId = context.addTask(new NodePackageInstallTask());

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

    const appId = context.addTask(app, [installId]);
    const matId = context.addTask(material, [appId]);
    const setupId = context.addTask(setup, [matId]);

    return tree;
  };
}
