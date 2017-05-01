import parser from 'songbox/utils/parsers/opensong';
import { module, test } from 'qunit';

module('Unit | Utility | parsers/opensong');

test('it should parse lyrics only', function(assert) {
  assert.expect(2);

  let result = parser(`
[V]
 Dank sei Dir
`);

  assert.equal(result.length, 1, 'should have 1 section');
  let section = result[0];

  assert.deepEqual(section, {
    header: 'V',
    lines: [
      {
        lyrics: [
          ['Dank sei Dir']
        ]
      }
    ]
  });
});
