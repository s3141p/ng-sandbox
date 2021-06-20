import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentPreviewModule } from '../component-preview/component-preview.module';
import { ExampleComponent } from './example.component';

@NgModule({
  imports: [CommonModule, ComponentPreviewModule],
  declarations: [ExampleComponent],
  exports: [ExampleComponent],
})
export class ExampleModule {}
