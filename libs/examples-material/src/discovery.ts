import { LibraryDescriptor } from '@ng-sandbox/components';

export const library: LibraryDescriptor = {
  name: 'Angular Material',
  components: [
    {
      name: 'Input',
      resolve: () =>
        import('./lib/input/descriptor').then((module) => {
          return module.InputComponentDescriptor;
        }),
    },
    {
      name: 'Badge',
      resolve: () =>
        import('./lib/badge/descriptor').then((module) => {
          return module.BadgeComponentDescriptor;
        }),
    },
    {
      name: 'Bottom sheet',
      resolve: () =>
        import('./lib/bottom-sheet/descriptor').then((module) => {
          return module.BottomSheetComponentDescriptor;
        }),
    },
    {
      name: 'Button',
      resolve: () =>
        import('./lib/button/descriptor').then((module) => {
          return module.ButtonComponentDescriptor;
        }),
    },
    {
      name: 'Button goggle',
      resolve: () =>
        import('./lib/button-toggle/descriptor').then((module) => {
          return module.ButtonToggleComponentDescriptor;
        }),
    },
  ],
};
