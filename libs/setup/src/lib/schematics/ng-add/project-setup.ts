import { parse, join } from 'path';
import { readFileSync } from 'fs';
import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { template } from '@angular-devkit/core';
import {
  getWorkspace,
  updateWorkspace,
} from '@schematics/angular/utility/workspace';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  insertImport,
} from '@angular/cdk/schematics';

import { findRootTsConfig } from '../utils/tsconfig';
import { TsConfig, generatePathPatch } from '../dependencies';
import { Schema } from './schema';
import {
  getProjectTsConfig,
  getProjectSourceRoot,
} from '../utils/workspace/project';
import { createSourceFile } from '../utils/ast/source-file';
import { addClassProperty } from '../utils/ast/class';
import { insert } from '../utils/ast/insert';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const sourceRoot = getProjectSourceRoot(project);

    const builders = updateBuilders(options);
    const devkitrc = createDevkitRc();
    const discovery = addAppDiscoveryFile(options, project, sourceRoot);
    const imports = addModuleImports(project);
    const appComponentChanges = addAppComponentChanges(sourceRoot);
    const templateChanges = overwriteTemplates(options, sourceRoot);

    return chain([
      builders,
      devkitrc,
      discovery,
      imports,
      appComponentChanges,
      templateChanges,
    ]);
  };
}

function updateBuilders(options: Schema): Rule {
  return updateWorkspace((workspace) => {
    const project = getProjectFromWorkspace(workspace, options.project);
    const buildTarget = project.targets.get('build');
    const serveTarget = project.targets.get('serve');

    buildTarget.builder = '@ui-devkit/builders:build';
    serveTarget.builder = '@ui-devkit/builders:serve';

    project.targets.delete('serve');
    project.targets.delete('build');

    project.targets.add({ name: 'build', ...buildTarget });
    project.targets.add({ name: 'serve', ...serveTarget });
  });
}

function createDevkitRc(): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const devkit = '.devkitrc.json';

    if (!host.exists(devkit)) {
      host.create(devkit, JSON.stringify({ libs: [] }));
    }
  };
}

function addModuleImports(project: ProjectDefinition): Rule {
  return async (host: Tree, context: SchematicContext) => {
    addModuleImportToRootModule(
      host,
      'WidgetModule',
      '@devkit/components',
      project
    );
  };
}

function addAppComponentChanges(sourceRoot: string): Rule {
  return async (host: Tree) => {
    const appComponentPath = join(sourceRoot, 'app', 'app.component.ts');
    const componentSource = createSourceFile(host, appComponentPath);

    const addPropertyChanges = addClassProperty(
      appComponentPath,
      componentSource,
      'AppComponent',
      '\nlibs: LibraryDescriptor[] = libraries;'
    );

    const discoveryChanges = insertImport(
      componentSource,
      appComponentPath,
      'libraries',
      '@ng-preview/discovery'
    );

    const libraryChanges = insertImport(
      componentSource,
      appComponentPath,
      'LibraryDescriptor',
      '@ng-preview/components'
    );

    insert(host, appComponentPath, [
      discoveryChanges,
      libraryChanges,
      addPropertyChanges,
    ]);
  };
}

function overwriteTemplates(options: Schema, sourceRoot: string): Rule {
  return async (host: Tree) => {
    const htmlTemplate = readFileSync(
      join(__dirname, 'templates', 'app.component.html.template')
    ).toString();

    const stylesTymplate = readFileSync(
      join(__dirname, 'templates', 'app.component.style.template')
    ).toString();

    const pathToTemplate = join(sourceRoot, 'app', 'app.component.html');
    const pathToStyles = join(
      sourceRoot,
      'app',
      `app.component.${options.style}`
    );

    host.overwrite(pathToTemplate, template(htmlTemplate)({}));
    host.overwrite(pathToStyles, template(stylesTymplate)({}));
  };
}

function addAppDiscoveryFile(
  options: Schema,
  project: ProjectDefinition,
  sourceRoot: string
): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const tsConfigPath = getProjectTsConfig(project);

    if (!tsConfigPath) {
      context.logger.error(`Can't find tsConfig path for ${options.project}`);
    }

    let rootConfig: TsConfig;
    let rootPath: string;

    try {
      const rootOptions = findRootTsConfig(host, tsConfigPath);
      rootConfig = rootOptions.config;
      rootPath = rootOptions.path;
    } catch (e) {
      context.logger.warn(
        `Can't resolve tsconfig to add '@ng-sandbox/discovery' path alias. Please do it manually`
      );

      return;
    }

    const discoveryTemplate = readFileSync(
      join(__dirname, 'templates', 'discovery.ts.template')
    ).toString();

    if (!rootConfig.compilerOptions?.paths) {
      rootConfig.compilerOptions = rootConfig.compilerOptions || {};
      rootConfig.compilerOptions.paths = {};
    }

    const pathToDiscovery = generatePathPatch(
      parse(rootPath).dir,
      join(sourceRoot, 'discovery.ts')
    );

    rootConfig.compilerOptions.paths['@ng-sandbox/discovery'] = [
      pathToDiscovery,
    ];

    host.create(pathToDiscovery, template(discoveryTemplate)({}));
    host.overwrite(rootPath, JSON.stringify(rootConfig));
  };
}
