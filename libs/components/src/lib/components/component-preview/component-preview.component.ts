import {
  Compiler,
  Component,
  Input,
  NgModuleFactory,
  OnInit,
} from '@angular/core';
import { ComponentExampleDescriptor } from '../../types/example-descriptor';

@Component({
  selector: 'devkit-component-preview',
  templateUrl: './component-preview.component.html',
  styleUrls: ['./component-preview.component.scss'],
})
export class ComponentPreviewComponent implements OnInit {
  @Input() example!: ComponentExampleDescriptor;

  factory!: NgModuleFactory<unknown>;

  constructor(private compiler: Compiler) {}

  async ngOnInit(): Promise<void> {
    this.factory = this.compiler.compileModuleSync<unknown>(
      this.example.exampleModule
    );
  }
}
