import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import * as fs from 'fs';
import path from 'path';
import { loadConfig } from '../src/config';
import type { ConfigSchema } from '../src/types';

describe('loadConfig', () => {
  const configPath = path.resolve(__dirname, '../config/config.json');
  let originalConfig: string;

  beforeAll(() => {
    originalConfig = fs.readFileSync(configPath, 'utf-8');
  });
  afterEach(() => {
    fs.writeFileSync(configPath, originalConfig, 'utf-8');
  });

  it('returns correct ConfigSchema', () => {
    const cfg = loadConfig();
    expect(cfg).toEqual<ConfigSchema>({
      studying: [],
      gaming: [],
      audio: { good: 'good.mp3', bad: 'bad.mp3', neutral: 'neutral.mp3' },
    });
  });

  it('throws on missing studying', () => {
    const invalid = JSON.stringify({ gaming: [], audio: { good: 'g', bad: 'b', neutral: 'n' } });
    fs.writeFileSync(configPath, invalid, 'utf-8');
    expect(() => loadConfig()).toThrow('Invalid config: studying must be an array.');
  });
});