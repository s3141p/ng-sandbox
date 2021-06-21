import { LibraryDescriptor } from '@devkit/components';

import { BadgeComponentDescriptor } from './lib/badge/descriptor';
import { BottomSheetComponentDescriptor } from './lib/bottom-sheet/descriptor';
import { ButtonToggleComponentDescriptor } from './lib/button-toggle/descriptor';
import { ButtonComponentDescriptor } from './lib/button/descriptor';
import { InputComponentDescriptor } from './lib/input/descriptor';

export const library: LibraryDescriptor = {
  name: 'Angular Material',
  components: [
    InputComponentDescriptor,
    BadgeComponentDescriptor,
    BottomSheetComponentDescriptor,
    ButtonComponentDescriptor,
    ButtonToggleComponentDescriptor,
  ],
};
