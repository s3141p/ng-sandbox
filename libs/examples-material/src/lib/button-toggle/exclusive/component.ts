import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-button-toggle-exclusive',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonToggleExclusiveComponent {}

export const ButtonToggleExclusiveExample: ExampleDescriptor = {
  name: 'Exclusive selection',
  component: ButtonToggleExclusiveComponent,
};
