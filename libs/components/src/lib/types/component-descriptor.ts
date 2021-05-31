import { ExampleDescriptor } from './example-descriptor';

export interface ComponentDescriptor {
  component: new (...args: unknown[]) => unknown;
  componentModule: new (...args: unknown[]) => unknown;
  examples: ExampleDescriptor[];
  name: string;
}
