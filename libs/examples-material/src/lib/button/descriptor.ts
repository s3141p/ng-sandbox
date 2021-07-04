import { ComponentDescriptor } from '@ng-sandbox/components';

import { ButtonDependenciesModule } from './dependencies';
import { ButtonOverviewDescriptor } from './basic/component';
import { ButtonVarietiesExample } from './varieties/component';

export const ButtonComponentDescriptor: ComponentDescriptor = {
  name: 'Button',
  moduleWithDependencies: ButtonDependenciesModule,
  examples: [ButtonOverviewDescriptor, ButtonVarietiesExample],
};
