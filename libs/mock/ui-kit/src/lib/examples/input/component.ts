import { ComponentDescriptor } from '@devkit/components';
import { InputComponent, InputComponentModule } from '../../components/input';

import { InputComponentPropsExample } from './render-via-props';
import { InputComponentExample } from './render-via-comp';

export const InputComponentDescriptor: ComponentDescriptor = {
  name: 'InputComponent',
  component: InputComponent,
  componentModule: InputComponentModule,
  examples: [InputComponentPropsExample, InputComponentExample],
};
