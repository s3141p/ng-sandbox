import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentPreviewComponent } from './component-preview.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentPreviewComponent],
  exports: [ComponentPreviewComponent],
})
export class ComponentPreviewModule {}
