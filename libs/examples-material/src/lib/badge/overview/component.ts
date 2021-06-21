import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-badge-overview',
  templateUrl: './component.html',
})
export class BadgeOverviewComponent {
  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

export const BadgeOverviewDescriptor: ExampleDescriptor = {
  name: 'Badge overview',
  component: BadgeOverviewComponent,
};
