import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

import { BadgeOverviewComponent } from './overview/component';

@NgModule({
  imports: [CommonModule, MatBadgeModule, MatButtonModule],
  declarations: [BadgeOverviewComponent],
})
export class BadgeDependenciesModule {}
