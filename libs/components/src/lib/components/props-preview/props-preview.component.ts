import { ComponentFactoryResolver, OnDestroy } from '@angular/core';
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
  ComponentPropsExampleDescriptor,
  ExampleInput,
  ExampleOutput,
} from '../../types/example-descriptor';

@Component({
  selector: 'devkit-props-preview',
  templateUrl: './props-preview.component.html',
  styleUrls: ['./props-preview.component.scss'],
})
export class PropsPreviewComponent implements OnInit, OnDestroy {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  @Input() example!: ComponentPropsExampleDescriptor;
  @Input() componentModule!: new (...args: unknown[]) => unknown;
  @Input() component!: new (...args: unknown[]) => any;

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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.component
    );
    const { instance } = this.vc.createComponent(
      componentFactory,
      this.vc.length,
      undefined,
      this.example.projectedContent || []
    );

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
