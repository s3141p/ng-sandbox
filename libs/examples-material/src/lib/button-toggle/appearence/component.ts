import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-button-toggle-appearence',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class ButtonToggleAppearenceComponent {}

export const ButtonToggleAppearenceDescriptor: ExampleDescriptor = {
  name: 'Button toggle appearance',
  component: ButtonToggleAppearenceComponent,
};
