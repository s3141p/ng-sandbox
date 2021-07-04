# Manual Setup

## Precaution

Only components in libraries can be rendered.  
What is library? Please consider such `angular.json`. Library it's a project with `library` type in angular workspace.

```json
"projects": {
    "my-lib": {
      "projectType": "library",
      ...
      "architect": {
          ...
      }
    },
}
```

## Install

1. `npm i --save-dev @ng-sandbox/builders @ng-sandbox/components`

## Angular Material Application generation

2. `ng generate application --name=sandbox`
3. Update `defaultProject` in `angular.json` to "devkit" (You can reset it after install)
4. ng add @angular/material

## Setup

### Builders configuring

5. In `angular.json` change the sandbox app builders

```diff json
"sandbox": {
    "projectType": "application",
    ...
    "architect": {
        "build": {
-         "builder": "@angular-devkit/build-angular:browse",
+         "builder": "@ng-sandbox/builders:build",
          "options": {
              ...
          }
        },
        "serve": {
-           "builder": "@angular-devkit/build-angular:dev-server",
+           "builder": "@ng-sandbox/builders:serve",
            "configurations": {
                ...
            },
            "defaultConfiguration": "development"
        }
    }
}
```

6. Create `.ng-sandboxrc.json` and specify that libraries which you will use, eg

```json
{
  "libs": [
    {
      "libName": "my-lib",
      "tsConfig": "projects/my-lib/tsconfig.lib.json"
    }
  ]
}
```

### Prepare library

7. Create `discovery.ts` and put it to your library `sourceRoot` folder. E.g. `${sourceRoot}/discovery.ts`

8. Export constant `library` inside `discovery.ts` which satisfies [`LibraryDescriptor` type](https://github.com/s3141p/ng-sandbox/blob/master/libs/components/src/lib/types/library-descriptor.ts).

```ts
export const library: LibraryDescriptor = {
  name: 'My Lib',
  components: [
      ...
  ],
};
```

### Prepare application

9. import `LibraryDescriptor[]` inside `devkit` application:

```typescript
import { libraries } from '@ng-sandbox/discovery';
```

10. Import WidgetModule and provide it to the app module:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetModule } from '@ng-sandbox/components';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WidgetModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
```

11. Pass libraries to the devkit-widget:

```html
<ng-sandbox-widget [libraries]="libraries"></ng-sandbox-widget>
```

12. Serve/Build you application via:

- `ng serve sandbox --l=all`
- `ng build sandbox --l=all`

## Notes

- To run/build specific library use `--l=*name*`.

- To remove erros in editor:

1. Create discovery.ts file in sandbox source root:

```ts
import { LibraryDescriptor } from '@ng-sandbox/components';

export const libraries: LibraryDescriptor[] = [];
```

1. Add to a tsconfig.json such path mapping

```Diff
{
  "compilerOptions": {
    ...
    "paths": {
      ...
+     "@ng-sandbox/discovery": ["projects/sandbox/src/discovery.ts"],
    }
  },
}
```
