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

## Prepare workspace

1. `npm i --save-dev @ng-sandbox/setup @ng-sandbox/components`

### Angular Material Application generation

2. `ng generate application --name=sandbox`
3. Update `defaultProject` in `angular.json` to "devkit" (You can reset it after install)
4. ng add @angular/material


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

### Prepare application

1. Create `.ng-sandboxrc.json` and specify that libraries which you will use, eg

```json
{
  "libs": []
}
```

2. Import `WidgetModule` and provide it to the app module:

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

3. import `LibraryDescriptor[]` at `AppComponent`:

```typescript
import { libraries } from '@ng-sandbox/discovery';
```

4. Pass libraries to the devkit-widget:

```html
<ng-sandbox-widget [libraries]="libraries"></ng-sandbox-widget>
```

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

### Prepare library

1. Update .ng-discoveryrc.json with your library configuration

```json
{
  "libs": [
    {
      "libName": "my-lib",
      "tsConfig": "projects/my-lib/tsconfig.lib.json",
      "discoveryPath": "discovery.ts"
    }
  ]
}
```

2. Create `discovery.ts` and put it to your library `sourceRoot` folder. E.g. `${sourceRoot}/discovery.ts`

3. Export constant `library` inside `discovery.ts` which satisfies [`LibraryDescriptor` type](https://github.com/s3141p/ng-sandbox/blob/master/libs/components/src/lib/types/library-descriptor.ts).

```ts
export const library: LibraryDescriptor = {
  name: 'My Lib',
  components: [
      ...
  ],
};
```
