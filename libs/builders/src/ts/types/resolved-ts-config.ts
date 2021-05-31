import { TsConfig } from './tsconfig';

export interface TsConfigWithBaseUrl {
  config: TsConfig;
  path: string;
  baseUrl: string;
}
