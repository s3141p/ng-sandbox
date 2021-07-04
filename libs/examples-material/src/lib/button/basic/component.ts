import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-button-overview',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonOverviewComponent {}

export const ButtonOverviewDescriptor: ExampleDescriptor = {
  name: 'Basic buttons',
  component: ButtonOverviewComponent,
};
