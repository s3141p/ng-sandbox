import { mergeInheritedTsConfig } from './merge-inherited-ts-config';

describe('mergeInheritedTsConfig', () => {
  const cases = [
    {
      child: {
        extends: '../../tsconfig.base.json',
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['../../libs/libA/src/index.ts'],
            '@libB': ['../../libs/libB/src/index.ts'],
          },
        },
      },
      parent: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['libs/libA/src/index.ts'],
            '@libB': ['libs/libB/src/index.ts'],
          },
        },
      },
      expected: {
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@libA': ['../../libs/libA/src/index.ts'],
            '@libB': ['../../libs/libB/src/index.ts'],
          },
        },
      },
    },
  ];

  it('should merge', () => {
    cases.forEach((item) => {
      expect(mergeInheritedTsConfig(item.parent, item.child)).toEqual(
        item.expected
      );
    });
  });
});
