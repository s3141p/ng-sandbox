import { Component } from '@angular/core';
import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-input-in-a-form',
  templateUrl: '/component.html',
  styleUrls: ['./component.css'],
})
export class InputFormComponent {}

export const InputFormExampleDescriptor: ExampleDescriptor = {
  name: 'Inputs in a form',
  component: InputFormComponent,
};
