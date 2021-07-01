import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

async function createTestProject(
  runner: SchematicTestRunner,
  projectType: 'application' | 'library',
  appOptions = {},
  tree?: Tree
): Promise<UnitTestTree> {
  return runner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'workspace',
      {
        name: 'workspace',
        version: '1.2',
      },
      tree
    )
    .toPromise();

  // return runner
  //   .runExternalSchematicAsync(
  //     '@schematics/angular',
  //     projectType,
  //     { name: 'app', ...appOptions },
  //     workspaceTree
  //   )
  //   .toPromise();
}

export async function createTestApp(
  runner: SchematicTestRunner,
  appOptions = {},
  tree?: Tree
): Promise<UnitTestTree> {
  return createTestProject(runner, 'application', appOptions, tree);
}
