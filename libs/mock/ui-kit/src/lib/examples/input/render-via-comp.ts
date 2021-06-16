import { Component, NgModule } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';
import { InputComponentModule } from '../../components/input';

@Component({
  selector: 'devkit-input-example',
  template: '<devkit-input data="data from wrapper"></devkit-input>',
})
export class InputExample {}

@NgModule({ imports: [InputComponentModule], declarations: [InputExample] })
export class AComponentExampleModule {}

export const InputComponentExample: ExampleDescriptor = {
  type: 'Component',
  name: 'Rendering through wrapper',
  exampleComponent: InputExample,
  exampleModule: AComponentExampleModule,
};
