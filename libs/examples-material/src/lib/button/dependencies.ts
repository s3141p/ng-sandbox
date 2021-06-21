import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { ButtonOverviewComponent } from './basic/component';
import { ButtonVarietiesComponent } from './varieties/component';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  declarations: [ButtonOverviewComponent, ButtonVarietiesComponent],
})
export class ButtonDependenciesModule {}
