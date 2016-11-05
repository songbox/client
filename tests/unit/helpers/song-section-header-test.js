import { songSectionHeader } from 'songbox/helpers/song-section-header';
import { module, test } from 'qunit';

module('Unit | Helper | song section header');

test('substitutes certain leading letters', function(assert) {
  assert.expect(5);
  assert.equal(songSectionHeader(['C']), 'Chorus');
  assert.equal(songSectionHeader(['V']), 'Verse');
  assert.equal(songSectionHeader(['B']), 'Bridge');
  assert.equal(songSectionHeader(['T']), 'Tag');
  assert.equal(songSectionHeader(['P']), 'Pre-Chorus');
});

test('supports lowercase', function(assert) {
  assert.expect(5);
  assert.equal(songSectionHeader(['c']), 'Chorus');
  assert.equal(songSectionHeader(['v']), 'Verse');
  assert.equal(songSectionHeader(['b']), 'Bridge');
  assert.equal(songSectionHeader(['t']), 'Tag');
  assert.equal(songSectionHeader(['p']), 'Pre-Chorus');
});

test('seperates the rest with a space if it matches', function(assert) {
  assert.expect(3);
  assert.equal(songSectionHeader(['V1']), 'Verse 1');
  assert.equal(songSectionHeader(['v1']), 'Verse 1');
  assert.equal(songSectionHeader(['vlast']), 'Verse last');
});

test('does not change unmatched headers', function(assert) {
  assert.expect(3);
  assert.equal(songSectionHeader(['x']), 'x');
  assert.equal(songSectionHeader(['1']), '1');
  assert.equal(songSectionHeader(['section1']), 'section1');
});
