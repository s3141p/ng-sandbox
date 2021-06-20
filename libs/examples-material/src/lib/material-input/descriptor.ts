import { MatInput } from '@angular/material/input';

import { ComponentDescriptor } from '@devkit/components';

import { CustomErrorStateExample } from './custom-error-state-matcher';
import { InputFormExampleDescriptor } from './in-a-form/component';
import { WithClearButtonExample } from './with-clear-button';
import { MaterialInputDependenciesModule } from './dependencies';

export const MaterialInputComponentDescriptor: ComponentDescriptor = {
  name: 'Input',
  component: MatInput,
  moduleWithDependencies: MaterialInputDependenciesModule,
  examples: [
    WithClearButtonExample,
    CustomErrorStateExample,
    InputFormExampleDescriptor,
  ],
};
