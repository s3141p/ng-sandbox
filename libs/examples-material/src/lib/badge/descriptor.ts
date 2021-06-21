import { MatBadge } from '@angular/material/badge';

import { ComponentDescriptor } from '@devkit/components';

import { BadgeDependenciesModule } from './dependencies';
import { BadgeOverviewDescriptor } from './overview/component';

export const BadgeComponentDescriptor: ComponentDescriptor = {
  name: 'Badge',
  component: MatBadge,
  moduleWithDependencies: BadgeDependenciesModule,
  examples: [BadgeOverviewDescriptor],
};
