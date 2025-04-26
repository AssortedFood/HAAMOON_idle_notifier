import { describe, it, expect } from 'vitest';
import { hasStateChanged } from '../src/state';

describe('hasStateChanged', () => {
  it('returns false when state remains the same', () => {
    // initial state is 'none'
    expect(hasStateChanged('none')).toBe(false);
  });

  it('returns true only on actual state changes', () => {
    expect(hasStateChanged('studying')).toBe(true);
    expect(hasStateChanged('studying')).toBe(false);
    expect(hasStateChanged('gaming')).toBe(true);
    expect(hasStateChanged('gaming')).toBe(false);
  });
});