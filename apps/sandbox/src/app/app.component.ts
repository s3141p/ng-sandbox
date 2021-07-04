import { Component } from '@angular/core';

import { libraries } from '@ng-sandbox/discovery';
import { LibraryDescriptor } from '@ng-sandbox/components';

@Component({
  selector: 'ng-sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  libraries: LibraryDescriptor[] = libraries;
}
