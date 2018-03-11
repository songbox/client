import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/viewer-room';

module('Acceptance | lists index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    seed();
    authenticateSession(this.application);
  });

  test('should render without error', async function (assert) {
    assert.expect(1);

    const room = this.server.schema.rooms.find(1);
    await page.visit({ room_id: room.id });

    assert.equal(currentURL(), `/v/${room.id}`);
  });
});
