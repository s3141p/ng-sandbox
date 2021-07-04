import { Component, Input } from '@angular/core';

import { ExampleDescriptor } from '@ng-sandbox/components';

@Component({
  template: `<mat-form-field class="example-form-field">
    <mat-label>Clearable input</mat-label>
    <input matInput type="text" [(ngModel)]="value" />
    <button
      *ngIf="value"
      matSuffix
      mat-icon-button
      aria-label="Clear"
      (click)="value = ''"
    >
      <mat-icon>close</mat-icon>
    </button>
  </mat-form-field>`,
})
export class WithClearButtonComponent {
  @Input() value!: string;
}

export const WithClearButtonExample: ExampleDescriptor = {
  name: 'With clear button',
  component: WithClearButtonComponent,
};
