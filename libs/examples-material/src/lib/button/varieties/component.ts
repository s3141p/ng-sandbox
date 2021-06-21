import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-button-varieties',
  templateUrl: 'component.html',
  styleUrls: ['component.css'],
})
export class ButtonVarietiesComponent {}

export const ButtonVarietiesExample: ExampleDescriptor = {
  name: 'Button varieties',
  component: ButtonVarietiesComponent,
};
