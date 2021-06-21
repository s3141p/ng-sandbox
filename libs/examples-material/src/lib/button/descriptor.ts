import { MatInput } from '@angular/material/input';

import { ComponentDescriptor } from '@devkit/components';

import { ButtonDependenciesModule } from './dependencies';
import { ButtonOverviewDescriptor } from './basic/component';
import { ButtonVarietiesExample } from './varieties/component';

export const ButtonComponentDescriptor: ComponentDescriptor = {
  name: 'Button',
  moduleWithDependencies: ButtonDependenciesModule,
  examples: [ButtonOverviewDescriptor, ButtonVarietiesExample],
};
