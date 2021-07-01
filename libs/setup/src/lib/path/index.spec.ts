import { generatePathPatch } from './index';

describe('generatePathPatch', () => {
  interface Case {
    to: string;
    from: string;
    expected: string;
  }

  const cases: Case[] = [
    {
      from: 'discovery',
      to: 'libs/libA',
      expected: '../libs/libA',
    },
    {
      from: 'libs',
      to: 'libs/libA',
      expected: 'libA',
    },
    {
      from: '',
      to: 'libs/libA',
      expected: 'libs/libA',
    },
    {
      from: 'apps/libA/discovery',
      to: 'libs/group/libA/discovery',
      expected: '../../../libs/group/libA/discovery',
    },
  ];

  describe.each(cases)('%# generatePathDiff', ({ to, from, expected }) => {
    it(`should be equal ${expected}`, () => {
      expect(generatePathPatch(from, to)).toEqual(expected);
    });
  });
});
