import { Target } from '@angular-devkit/architect';

export function sameTargets(targetA: Target, targetB: Target) {
  return (
    targetA.target === targetB.target &&
    targetA.project === targetB.project &&
    targetA.configuration === targetB.configuration
  );
}
