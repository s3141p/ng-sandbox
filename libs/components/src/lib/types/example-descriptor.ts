export interface ExampleInput {
  [key: string]: unknown;
}

export interface ExampleOutput {
  [key: string]: (...args: unknown[]) => void;
}

export interface ExampleDescriptor {
  name: string;
  output?: ExampleOutput;
  input?: ExampleInput;
  component?: new (...args: unknown[]) => unknown;
}
