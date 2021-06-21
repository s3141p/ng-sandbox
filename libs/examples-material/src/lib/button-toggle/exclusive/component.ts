import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-button-toggle-exclusive',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonToggleExclusiveComponent {}

export const ButtonToggleExclusiveExample: ExampleDescriptor = {
  name: 'Exclusive selection',
  component: ButtonToggleExclusiveComponent,
};
