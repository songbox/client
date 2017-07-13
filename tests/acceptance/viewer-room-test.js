/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/viewer-room';

moduleForAcceptance('Acceptance | lists index', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('should render without error', async function (assert) {
  assert.expect(1);

  const room = server.schema.rooms.find(1);
  await page.visit({ room_id: room.id });

  assert.equal(currentURL(), `/v/${room.id}`);
});
