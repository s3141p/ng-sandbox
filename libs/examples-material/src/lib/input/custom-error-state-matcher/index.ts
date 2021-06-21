import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { ExampleDescriptor } from '@devkit/components';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'devkit-input-error-state-matcher-example',
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Email</mat-label>
        <input
          type="email"
          matInput
          [formControl]="emailFormControl"
          [errorStateMatcher]="matcher"
          placeholder="Ex. pat@example.com"
        />
        <mat-hint>Errors appear instantly!</mat-hint>
        <mat-error
          *ngIf="
            emailFormControl.hasError('email') &&
            !emailFormControl.hasError('required')
          "
        >
          Please enter a valid email address
        </mat-error>
        <mat-error *ngIf="emailFormControl.hasError('required')">
          Email is <strong>required</strong>
        </mat-error>
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class InputErrorStateMatcherComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}

export const CustomErrorStateExample: ExampleDescriptor = {
  name: 'With clear button',
  component: InputErrorStateMatcherComponent,
};
