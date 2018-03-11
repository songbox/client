import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/song-index';

module('Acceptance | song index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    seed();
    authenticateSession(this.application);
  });

  test('should redirect to /songs if song not found', async function (assert) {
    assert.expect(1);

    await page.visit({ id: 123 });

    assert.equal(currentURL(), '/a/songs', 'redirects to song overview');
  });
});

