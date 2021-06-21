import { MatInput } from '@angular/material/input';

import { ComponentDescriptor } from '@devkit/components';

import { CustomErrorStateExample } from './custom-error-state-matcher';
import { InputFormExampleDescriptor } from './in-a-form/component';
import { WithClearButtonExample } from './with-clear-button';
import { InputDependenciesModule } from './dependencies';

export const InputComponentDescriptor: ComponentDescriptor = {
  name: 'Input',
  component: MatInput,
  moduleWithDependencies: InputDependenciesModule,
  examples: [
    WithClearButtonExample,
    CustomErrorStateExample,
    InputFormExampleDescriptor,
  ],
};
