import { JsonValue, Path } from '@angular-devkit/core';
import {
  ProjectDefinition,
  WorkspaceDefinition,
} from '@angular-devkit/core/src/workspace';
import { SchematicsException } from '@angular-devkit/schematics';

export function getProjectMainFile(project: ProjectDefinition): Path {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.main) {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`
    );
  }

  return buildOptions.main as Path;
}

export function getProjectTsConfig(project: ProjectDefinition): string {
  const buildTarget = project.targets.get('build');

  if (!buildTarget) {
    throw new SchematicsException(`Could not find project build target`);
  }

  return buildTarget.options?.tsConfig as string;
}

export function getProjectSourceRoot(project: ProjectDefinition) {
  return project?.sourceRoot;
}

export function getProjectTargetOptions(
  project: ProjectDefinition,
  buildTarget: string
): Record<string, JsonValue | undefined> {
  const options = project.targets?.get(buildTarget)?.options;

  if (!options) {
    throw new SchematicsException(
      `Cannot determine project target configuration for: ${buildTarget}.`
    );
  }

  return options;
}

export function getProjectFromWorkspace(
  workspace: WorkspaceDefinition,
  projectName = workspace.extensions.defaultProject as string
): ProjectDefinition {
  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(
      `Could not find project in workspace: ${projectName}`
    );
  }

  return project;
}
