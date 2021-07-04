import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-button-varieties',
  templateUrl: 'component.html',
  styleUrls: ['component.css'],
})
export class ButtonVarietiesComponent {}

export const ButtonVarietiesExample: ExampleDescriptor = {
  name: 'Button varieties',
  component: ButtonVarietiesComponent,
};
