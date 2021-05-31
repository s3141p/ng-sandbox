import { ComponentDescriptor } from './component-descriptor';

export interface LibraryDescriptor {
  name: string;
  components: ComponentDescriptor[];
}
