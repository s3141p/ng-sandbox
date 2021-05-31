import { Component, Input, OnInit } from '@angular/core';

import { ComponentDescriptor, LibraryDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-widget',
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

  openExamplesFor(lib: LibraryDescriptor, component: ComponentDescriptor) {
    this.currentLib = lib;
    this.currentComponent = component;

    localStorage.setItem('current', [lib.name, component.name].join(':'));
  }

  private restoreState() {
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

    this.currentComponent = component;
    this.currentLib = lib;
  }
}
