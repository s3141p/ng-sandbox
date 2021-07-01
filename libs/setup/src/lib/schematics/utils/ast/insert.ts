import { Tree } from '@angular-devkit/schematics';
import {
  Change,
  InsertChange,
  NoopChange,
  RemoveChange,
} from '@schematics/angular/utility/change';

export function insert(host: Tree, modulePath: string, changes: Change[]) {
  const recorder = host.beginUpdate(modulePath);

  for (const change of changes) {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    } else if (change instanceof RemoveChange) {
      recorder.remove((<any>change).pos - 1, (<any>change).toRemove.length + 1);
    } else if (change instanceof NoopChange) {
      // do nothing
    } else {
      throw new Error(`Unexpected Change '${change}'`);
    }
  }

  host.commitUpdate(recorder);
}
