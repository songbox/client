/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/song-index';

moduleForAcceptance('Acceptance | song index', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('should redirect to /songs if song not found', async function (assert) {
  assert.expect(1);

  await page.visit({ id: 123 });

  assert.equal(currentURL(), '/a/songs', 'redirects to song overview');
});
