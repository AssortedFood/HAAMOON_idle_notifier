import { describe, it, expect } from 'vitest';
import { classify } from '../src/classifier';
import type { ConfigSchema } from '../src/types';

describe('classify', () => {
  const cfg: ConfigSchema = {
    studying: ['study'],
    gaming: ['game'],
    audio: { good: '', bad: '', neutral: '' },
  };

  it('identifies studying titles', () => {
    expect(classify('I like to study', cfg)).toBe('studying');
  });

  it('identifies gaming titles', () => {
    expect(classify('Playing a game now', cfg)).toBe('gaming');
  });

  it('identifies mixed titles', () => {
    expect(classify('Study game session', cfg)).toBe('mixed');
  });

  it('returns none for unrelated titles', () => {
    expect(classify('Just walking', cfg)).toBe('none');
  });
});