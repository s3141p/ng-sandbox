import {
  Compiler,
  Component,
  Injector,
  Input,
  NgModuleRef,
  OnInit,
} from '@angular/core';

import { ExampleDescriptor } from '../../types';

@Component({
  selector: 'devkit-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {
  @Input() example!: ExampleDescriptor;
  @Input() component?: new (...args: unknown[]) => unknown;
  @Input() moduleWithDependencies!: new (...args: unknown[]) => unknown;

  moduleRef!: NgModuleRef<unknown>;

  constructor(private compiler: Compiler, private injector: Injector) {}

  ngOnInit() {
    const factory = this.compiler.compileModuleSync(
      this.moduleWithDependencies
    );

    this.moduleRef = factory.create(this.injector);
  }
}
