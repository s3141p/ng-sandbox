import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

import {
  BottomSheetListComponent,
  BottomSheetOverviewComponent,
} from './overview';

@NgModule({
  imports: [MatButtonModule, MatBottomSheetModule, MatListModule],
  declarations: [BottomSheetOverviewComponent, BottomSheetListComponent],
})
export class BottomSheetDependenciesModule {}
