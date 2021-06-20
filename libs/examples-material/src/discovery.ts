import { LibraryDescriptor } from '@devkit/components';

import { MaterialInputComponentDescriptor } from './lib/material-input/descriptor';

export const library: LibraryDescriptor = {
  name: 'Angular Material',
  components: [MaterialInputComponentDescriptor],
};
