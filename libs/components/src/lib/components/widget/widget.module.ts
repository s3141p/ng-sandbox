import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { PropsPreviewModule } from '../props-preview/props-preview.module';
import { ComponentPreviewModule } from '../component-preview/component-preview.module';
import { WidgetComponent } from './widget.component';
import { ExampleModule } from '../example/example.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    PropsPreviewModule,
    ComponentPreviewModule,
    ExampleModule,
  ],
  declarations: [WidgetComponent],
  exports: [WidgetComponent],
})
export class WidgetModule {}
