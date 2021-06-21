import { ComponentDescriptor } from '@devkit/components';

import { ButtonToggleAppearenceDescriptor } from './appearence/component';
import { ButtonToggleDependenciesModule } from './dependencies';
import { ButtonToggleExclusiveExample } from './exclusive/component';

export const ButtonToggleComponentDescriptor: ComponentDescriptor = {
  name: 'Button goggle',
  moduleWithDependencies: ButtonToggleDependenciesModule,
  examples: [ButtonToggleAppearenceDescriptor, ButtonToggleExclusiveExample],
};
