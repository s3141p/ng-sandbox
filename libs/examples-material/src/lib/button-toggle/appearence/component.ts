import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-button-toggle-appearence',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonToggleAppearenceComponent {}

export const ButtonToggleAppearenceDescriptor: ExampleDescriptor = {
  name: 'Button toggle appearance',
  component: ButtonToggleAppearenceComponent,
};
