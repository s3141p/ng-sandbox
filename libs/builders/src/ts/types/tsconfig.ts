import { AngularCompilerOptions } from '@angular/compiler-cli';
import { CompilerOptions } from 'typescript';

export interface TsConfig {
  extends?: string;
  compilerOptions?: CompilerOptions;
  angularCompilerOptions?: AngularCompilerOptions;
  files?: string[];
  include?: string[];
}
