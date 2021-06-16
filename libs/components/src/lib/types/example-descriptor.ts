export interface ComponentExampleDescriptor {
  type: 'Component';
  name: string;
  exampleComponent: new (...args: unknown[]) => unknown;
  exampleModule: new (...args: unknown[]) => unknown;
}

export interface ExampleInput {
  [key: string]: unknown;
}

export interface ExampleOutput {
  [key: string]: (...args: unknown[]) => void;
}

export interface ComponentPropsExampleDescriptor {
  type: 'Props';
  name: string;
  output?: ExampleOutput;
  input?: ExampleInput;
  projectedContent?: any[][];
}

export type ExampleDescriptor =
  | ComponentExampleDescriptor
  | ComponentPropsExampleDescriptor;
