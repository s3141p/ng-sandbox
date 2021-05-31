import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputComponentModule {}
