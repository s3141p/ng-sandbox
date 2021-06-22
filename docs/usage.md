# Setup checklist

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

1. `npm i --save-dev @ui-devkit/builders @ui-devkit/components`

## Angular Material Application generation

2. `ng generate application --name=devkit`
3. Update `defaultProject` in `angular.json` to "devkit" (You can reset it after install)
4. ng add @angular/material

## Devkit setup

### Builders configuring

5. In `angular.json` change the devkit app builders

```diff json
"devkit": {
    "projectType": "application",
    ...
    "architect": {
        "build": {
-         "builder": "@angular-devkit/build-angular:browse",
+         "builder": "@ui-devkit/builders:build",
          "options": {
              ...
          }
        },
        "serve": {
-           "builder": "@angular-devkit/build-angular:dev-server",
+           "builder": "@ui-devkit/builders:serve",
            "configurations": {
                ...
            },
            "defaultConfiguration": "development"
        }
    }
}
```

6. Create `.devkitrc.json` and specify that libraries which you will use, eg

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

8. Export constant `library` inside `discovery.ts` which satisfies [`LibraryDescriptor` type](https://github.com/s3141p/ui-devkit/blob/master/libs/components/src/lib/types/library-descriptor.ts).

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
import { libraries } from '@devkit/discovery';
```

10. Import WidgetModule and provide it to the app module:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetModule } from '@devkit/components';

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
<devkit-widget [libraries]="libraries"></devkit-widget>
```

12. Serve/Build you application via:

- `ng serve devkit --l=all`
- `ng build devkit --l=all`

## Notes

- To run/build specific library use `--l=*name*`.

- To remove erros in editor:

1. Create discovery.ts file in devkit source root:

```ts
import { LibraryDescriptor } from '@devkit/components';

export const libraries: LibraryDescriptor[] = [];
```

1. Add to a tsconfig.json such path mapping

```Diff
{
  "compilerOptions": {
    ...
    "paths": {
      ...
+     "@devkit/discovery": ["projects/devkit/src/discovery.ts"],
    }
  },
}
```
