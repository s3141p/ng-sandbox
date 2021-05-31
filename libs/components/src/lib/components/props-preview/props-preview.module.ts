import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropsPreviewComponent } from './props-preview.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PropsPreviewComponent],
  exports: [PropsPreviewComponent],
})
export class PropsPreviewModule {}
