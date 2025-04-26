import type { ConfigSchema } from './types';

export function classify(
  title: string,
  cfg: ConfigSchema
): 'studying' | 'gaming' | 'mixed' | 'none' {
  const titleLower = title.toLowerCase();
  const studyingMatch = cfg.studying.some(keyword => titleLower.includes(keyword.toLowerCase()));
  const gamingMatch = cfg.gaming.some(keyword => titleLower.includes(keyword.toLowerCase()));
  if (studyingMatch && gamingMatch) return 'mixed';
  if (studyingMatch) return 'studying';
  if (gamingMatch) return 'gaming';
  return 'none';
}

