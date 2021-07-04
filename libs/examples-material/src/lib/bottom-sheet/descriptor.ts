import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { ComponentDescriptor } from '@ng-sandbox/components';

import { BottomSheetDependenciesModule } from './dependencies';
import { BottomSheetOverviewExample } from './overview';

export const BottomSheetComponentDescriptor: ComponentDescriptor = {
  name: 'Bottom sheet',
  component: MatBottomSheet,
  moduleWithDependencies: BottomSheetDependenciesModule,
  examples: [BottomSheetOverviewExample],
};
