export interface ExampleInput {
  [key: string]: unknown;
}

export interface ExampleOutput {
  [key: string]: (...args: any[]) => void;
}

export interface ExampleDescriptor {
  name: string;
  output?: ExampleOutput;
  input?: ExampleInput;
  component?: new (...args: any[]) => unknown;
}
