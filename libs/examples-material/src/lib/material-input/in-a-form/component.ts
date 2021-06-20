import { Component } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-input-in-a-form',
  templateUrl: '/component.html',
  styleUrls: ['./component.css'],
})
export class InputFormComponent {}

export const InputFormExampleDescriptor: ExampleDescriptor = {
  name: 'Inputs in a form',
  component: InputFormComponent,
};
