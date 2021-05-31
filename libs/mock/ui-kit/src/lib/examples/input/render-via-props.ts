import { ExampleDescriptor } from '@devkit/components';

export const InputComponentPropsExample: ExampleDescriptor = {
  name: 'Rendering with props',
  type: 'Props',
  input: {
    data: '123456',
  },
  output: {
    out: (...args) => console.log(args),
  },
};
