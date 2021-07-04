import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-badge-overview',
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
