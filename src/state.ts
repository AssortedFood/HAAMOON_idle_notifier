let lastState: string = 'none';

export function hasStateChanged(newState: string): boolean {
  if (newState === lastState) return false;
  lastState = newState;
  return true;
}

