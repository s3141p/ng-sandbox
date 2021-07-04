import { MatBadge } from '@angular/material/badge';

import { ComponentDescriptor } from '@ng-sandbox/components';

import { BadgeDependenciesModule } from './dependencies';
import { BadgeOverviewDescriptor } from './overview/component';

export const BadgeComponentDescriptor: ComponentDescriptor = {
  name: 'Badge',
  component: MatBadge,
  moduleWithDependencies: BadgeDependenciesModule,
  examples: [BadgeOverviewDescriptor],
};
