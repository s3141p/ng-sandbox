import { Component } from '@angular/core';

import { libraries } from '@devkit/discovery';
import { LibraryDescriptor } from '@devkit/components';

@Component({
  selector: 'devkit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  libraries: LibraryDescriptor[] = libraries;
}
