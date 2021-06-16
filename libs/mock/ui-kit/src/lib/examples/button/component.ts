import { ComponentDescriptor } from '@devkit/components';

import { ButtonComponent } from '../../components/button/button.component';
import { ButtonModule } from '../../components/button/button.module';
import { ButtonComponentProjectedExample } from './projected';

export const ButtonComponentDescriptor: ComponentDescriptor = {
  name: 'ButtonComponent',
  component: ButtonComponent,
  componentModule: ButtonModule,
  examples: [ButtonComponentProjectedExample],
};
