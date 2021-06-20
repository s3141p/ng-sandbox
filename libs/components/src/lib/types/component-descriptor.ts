import { ExampleDescriptor } from './example-descriptor';

export interface ComponentDescriptor {
  component: new (...args: any[]) => unknown;
  moduleWithDependencies?: new (...args: any[]) => unknown;
  examples: ExampleDescriptor[];
  name: string;
}
