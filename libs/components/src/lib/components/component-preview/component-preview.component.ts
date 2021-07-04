import {
  ComponentFactoryResolver,
  NgModuleRef,
  OnDestroy,
} from '@angular/core';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ExampleDescriptor,
  ExampleInput,
  ExampleOutput,
} from '../../types/example-descriptor';

@Component({
  selector: 'ng-sandbox-component-preview',
  templateUrl: './component-preview.component.html',
  styleUrls: ['./component-preview.component.scss'],
})
export class ComponentPreviewComponent implements OnInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  @Input() example!: ExampleDescriptor;
  @Input() moduleRef!: NgModuleRef<unknown>;
  @Input() component?: new (...args: unknown[]) => any;

  destroy = new Subject<null>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    setTimeout(() => {
      this.initComponent();
    });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private initComponent() {
    const component = this.example.component || this.component;

    if (!component) {
      return;
    }

    const componentFactory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const { instance } = this.vc.createComponent(componentFactory);

    this.initInput(instance, this.example.input);
    this.initOutput(instance, this.example.output);
  }

  private initInput(instance: any, input?: ExampleInput) {
    if (input) {
      Object.keys(input).forEach((key) => {
        instance[key] = input[key];
      });
    }
  }

  private initOutput(instance: any, output?: ExampleOutput) {
    if (output) {
      Object.keys(output).forEach((key) => {
        instance[key].pipe(takeUntil(this.destroy)).subscribe((data: any) => {
          output[key](data);
        });
      });
    }
  }
}
