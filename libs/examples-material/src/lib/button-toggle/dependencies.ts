import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { ButtonToggleAppearenceComponent } from './appearence/component';
import { ButtonToggleExclusiveComponent } from './exclusive/component';

@NgModule({
  imports: [MatButtonToggleModule, MatIconModule],
  declarations: [
    ButtonToggleAppearenceComponent,
    ButtonToggleExclusiveComponent,
  ],
})
export class ButtonToggleDependenciesModule {}
