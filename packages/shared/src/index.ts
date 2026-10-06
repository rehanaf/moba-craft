export const SKIN_FILES = [
  'steve',
  'alex',
  'blue-demon',
  'nether-king',
  'skull',
  'hacker',
  'dream',
] as const;

export type SkinId = (typeof SKIN_FILES)[number];

export const skinUrl = (id: SkinId): string => `/skins/${id}.png`;
