import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropsPreviewModule } from '../props-preview/props-preview.module';
import { ComponentPreviewModule } from '../component-preview';
import { ExampleComponent } from './example.component';

@NgModule({
  imports: [CommonModule, PropsPreviewModule, ComponentPreviewModule],
  declarations: [ExampleComponent],
  exports: [ExampleComponent],
})
export class ExampleModule {}
