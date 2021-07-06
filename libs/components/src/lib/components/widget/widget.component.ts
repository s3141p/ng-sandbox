import { Component, Input, OnInit } from '@angular/core';

import {
  AsyncComponentDescriptor,
  ComponentDescriptor,
} from '../../types/component-descriptor';
import { LibraryDescriptor } from '../../types/library-descriptor';

@Component({
  selector: 'ng-sandbox-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnInit {
  @Input() libraries: LibraryDescriptor[] = [];

  currentLib: LibraryDescriptor | null = null;
  currentComponent: ComponentDescriptor | null = null;

  ngOnInit() {
    this.restoreState();
  }

  resetState() {
    localStorage.removeItem('current');
    this.currentComponent = null;
    this.currentLib = null;
  }

  async openExamplesFor(
    lib: LibraryDescriptor,
    component: ComponentDescriptor | AsyncComponentDescriptor
  ) {
    this.currentLib = lib;
    this.currentComponent = await this.resolve(component);

    localStorage.setItem('current', [lib.name, component.name].join(':'));
  }

  private async restoreState() {
    const state = localStorage.getItem('current');

    if (!state) {
      return;
    }

    const [libName, componentName] = state.split(':');
    const lib = this.libraries.find((item) => item.name === libName);

    if (!lib) {
      return;
    }

    const component = lib.components.find(
      (item) => item.name === componentName
    );

    if (!component) {
      return;
    }
    this.currentLib = lib;

    if (this.isAsync(component)) {
      this.currentComponent = await component.resolve();
    } else {
      this.currentComponent = component;
    }
  }

  resolve(
    descr: ComponentDescriptor | AsyncComponentDescriptor
  ): Promise<ComponentDescriptor> {
    return this.isAsync(descr) ? descr.resolve() : Promise.resolve(descr);
  }

  isAsync(
    descr: ComponentDescriptor | AsyncComponentDescriptor
  ): descr is AsyncComponentDescriptor {
    return !(descr as ComponentDescriptor).examples;
  }
}
