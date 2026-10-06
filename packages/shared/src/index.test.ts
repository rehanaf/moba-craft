import { describe, expect, it } from 'vitest';
import { SKIN_FILES, skinUrl } from './index';

describe('shared skins', () => {
  it('lists 7 skins', () => {
    expect(SKIN_FILES).toHaveLength(7);
  });

  it('builds skin urls from assets/skins', () => {
    expect(skinUrl('nether-king')).toBe('/skins/nether-king.png');
  });
});
