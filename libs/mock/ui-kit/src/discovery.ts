import { LibraryDescriptor } from '@devkit/components';

import { ButtonComponentDescriptor } from './lib/examples/button/component';
import { InputComponentDescriptor } from './lib/examples/input/component';

export const library: LibraryDescriptor = {
  name: 'Ui-kit',
  components: [InputComponentDescriptor, ButtonComponentDescriptor],
};
