import { Component, Input } from '@angular/core';

import { ExampleDescriptor } from '../../types';

@Component({
  selector: 'devkit-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
  @Input() example!: ExampleDescriptor;
  @Input() component?: new (...args: unknown[]) => unknown;
}
