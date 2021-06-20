import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { InputErrorStateMatcherComponent } from './custom-error-state-matcher';
import { InputFormComponent } from './in-a-form/component';

import { WithClearButtonComponent } from './with-clear-button';

@NgModule({
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WithClearButtonComponent,
    InputErrorStateMatcherComponent,
    InputFormComponent,
  ],
})
export class MaterialInputDependenciesModule {}
