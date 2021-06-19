import { Component, NgModule } from '@angular/core';
import { ExampleDescriptor } from '@devkit/components';
import { InputComponentModule } from '../../components/input';

@Component({
  selector: 'devkit-input-example',
  template: '<devkit-input data="data from wrapper"></devkit-input>',
})
export class InputExampleComponent {}

@NgModule({ imports: [InputComponentModule], declarations: [InputExampleComponent] })
export class AComponentExampleModule {}

export const InputComponentExample: ExampleDescriptor = {
  type: 'Component',
  name: 'Rendering through wrapper',
  exampleComponent: InputExampleComponent,
  exampleModule: AComponentExampleModule,
};
