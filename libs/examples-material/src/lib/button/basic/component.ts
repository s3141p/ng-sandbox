import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-button-overview',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonOverviewComponent {}

export const ButtonOverviewDescriptor: ExampleDescriptor = {
  name: 'Basic buttons',
  component: ButtonOverviewComponent,
};
