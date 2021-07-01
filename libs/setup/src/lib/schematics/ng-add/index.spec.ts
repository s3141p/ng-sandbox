import { join } from 'path';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { collectionPath } from '../../../../paths';
import { createTestApp } from '../utils/spec/create-test-app';
import { getFileContent } from '../utils/file';
import { findRootTsConfig } from '../utils/tsconfig';
import { getProjectFromWorkspace } from '../utils/workspace/project';
import { getPackageJson } from '../utils/package-json';
import {
  ProjectDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';

describe('Schematic: ng add', () => {
  let runner: SchematicTestRunner;
  let initialTree: Tree;

  beforeEach(async () => {
    runner = new SchematicTestRunner('schematics', collectionPath);
    initialTree = await createTestApp(runner);
  });

  describe('When ng add was run', () => {
    let tree;
    beforeEach(async () => {
      tree = await runNgAdd(initialTree);
    });

    it('should add tasks to the queue', () => {
      expect(runner.tasks).toEqual([
        {
          name: 'run-schematic',
          options: {
            collection: '@schematics/angular',
            name: 'application',
            options: {
              name: 'preview',
              projectRoot: 'preview',
              routing: false,
              skipInstall: true,
              style: 'scss',
            },
          },
        },
        {
          name: 'run-schematic',
          options: {
            collection: '@angular/material',
            name: 'ng-add',
            options: {
              animations: true,
              project: 'preview',
              typography: true,
            },
          },
        },
        {
          name: 'run-schematic',
          options: {
            collection: null,
            name: 'ng-add-setup-project',
            options: {
              project: 'preview',
              projectRoot: '',
              style: 'scss',
            },
          },
        },
      ]);
    });

    it('it should add dependencies to package.json', async () => {
      const packageJson = getPackageJson(tree);

      expect(packageJson.devDependencies['@ui-devkit/components']).toContain(
        '0'
      );
      expect(packageJson.devDependencies['@ui-devkit/builders']).toContain('0');
    });
  });

  describe('When @schematics/angular and @angular/material ng-add was run', () => {
    let tree: Tree;

    beforeEach(async () => {
      tree = await runAngularApplication(initialTree);
      tree = await runMaterialNgAdd(tree);
    });

    it('should have required dependencies', () => {
      const packageJson = getPackageJson(tree);

      expect(packageJson.dependencies['@angular/material']).toContain('12');
      expect(packageJson.dependencies['@angular/cdk']).toContain('12');
    });

    it('should generate application with material theme', async () => {
      const workspace = await getWorkspace(tree);
      const project = getProjectFromWorkspace(workspace, 'preview');
      const targets = project.targets;

      expect(targets.get('build').builder).toEqual(
        '@angular-devkit/build-angular:browser'
      );
      expect(targets.get('serve').builder).toEqual(
        '@angular-devkit/build-angular:dev-server'
      );
    });
  });

  describe('When ng-add-setup-project was run', () => {
    let tree: Tree;
    let workspace: WorkspaceDefinition;
    let project: ProjectDefinition;

    beforeEach(async () => {
      tree = await runAngularApplication(initialTree);
      tree = await runMaterialNgAdd(tree);
      tree = await runNgAddSetupProject(tree);

      workspace = await getWorkspace(tree);
      project = getProjectFromWorkspace(workspace, 'preview');
    });

    it('should overwrite builders', async () => {
      const targets = project.targets;

      expect(targets.get('build').builder).toEqual('@ui-devkit/builders:build');
      expect(targets.get('serve').builder).toEqual('@ui-devkit/builders:serve');
    });

    it('should setup .devkitrc.json', () => {
      const devkitrc = JSON.parse(getFileContent(tree, '.devkitrc.json'));

      expect(devkitrc).toEqual({ libs: [] });
    });

    it('should create discovery.ts file and patch root tsconfig', () => {
      const { config, path } = findRootTsConfig(tree, 'tsconfig.json');
      const discoveryFilePath = 'preview/src/discovery.ts';
      const discoveryFile = getFileContent(tree, discoveryFilePath);

      expect(config.compilerOptions.paths).toEqual({
        ['@ng-sandbox/discovery']: [discoveryFilePath],
      });

      expect(discoveryFile).toContain(
        'export const libraries: LibraryDescriptor[] = [];'
      );
    });

    it('should add imports to the application module', async () => {
      const mainModulePath = join(project.sourceRoot, 'app', 'app.module.ts');
      const mainModule = tree.read(mainModulePath).toString();

      expect(mainModule).toContain(
        `import { WidgetModule } from '@devkit/components';`
      );
    });

    it('should add imports to the application module', async () => {
      const mainModulePath = join(project.sourceRoot, 'app', 'app.module.ts');
      const mainModule = tree.read(mainModulePath).toString();

      expect(mainModule).toContain(
        `import { WidgetModule } from '@devkit/components';`
      );
    });

    it('should modify application component', async () => {
      const componentTs = join(project.sourceRoot, 'app', 'app.component.ts');
      const componentScss = join(
        project.sourceRoot,
        'app',
        'app.component.scss'
      );
      const componentHtml = join(
        project.sourceRoot,
        'app',
        'app.component.html'
      );
      const componentTsContent = tree.read(componentTs).toString();
      const componentHtmlContent = tree.read(componentHtml).toString();
      const componentScssContent = tree.read(componentScss).toString();

      expect(componentTsContent).toContain(
        `import { libraries } from '@ng-preview/discovery';`
      );
      expect(componentTsContent).toContain(
        `import { LibraryDescriptor } from '@ng-preview/components';`
      );

      expect(componentTsContent).toContain(
        `libs: LibraryDescriptor[] = libraries;`
      );

      expect(componentHtmlContent).toContain(
        `<devkit-widget [libraries]="libraries"></devkit-widget>`
      );

      expect(componentScssContent).toContain(`height: 100%`);
      expect(componentScssContent).toContain(`display: block`);
    });
  });

  function runAngularApplication(tree) {
    return runner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        {
          name: 'preview',
          routing: false,
          skipInstall: true,
          style: 'scss',
        },
        tree
      )
      .toPromise();
  }

  function runMaterialNgAdd(tree) {
    return runner
      .runExternalSchematicAsync(
        '@angular/material',
        'ng-add',
        {
          project: 'preview',
          projectRoot: '',
        },
        tree
      )
      .toPromise();
  }

  function runNgAdd(tree) {
    return runner
      .runSchematicAsync(
        'ng-add',
        { project: 'preview', projectRoot: '', style: 'scss' },
        tree
      )
      .toPromise();
  }

  function runNgAddSetupProject(tree) {
    return runner
      .runSchematicAsync(
        'ng-add-setup-project',
        { project: 'preview', projectRoot: '', style: 'scss' },
        tree
      )
      .toPromise();
  }
});
