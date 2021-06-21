import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

import { ExampleDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-bottom-sheet-list',
  template: `
    <mat-nav-list>
      <a
        href="https://keep.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>

      <a
        href="https://docs.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Docs</span>
        <span mat-line>Embed in a document</span>
      </a>

      <a
        href="https://plus.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Plus</span>
        <span mat-line>Share with your friends</span>
      </a>

      <a
        href="https://hangouts.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Hangouts</span>
        <span mat-line>Show to your coworkers</span>
      </a>
    </mat-nav-list>
  `,
})
export class BottomSheetListComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetListComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'devkit-bottom-sheet-overview',
  template: `
    <p>You have received a file called "cat-picture.jpeg".</p>

    <button mat-raised-button (click)="openBottomSheet()">Open file</button>
  `,
})
export class BottomSheetOverviewComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetListComponent);
  }
}

export const BottomSheetOverviewExample: ExampleDescriptor = {
  name: 'Bottom Sheet Overview',
  component: BottomSheetOverviewComponent,
};
