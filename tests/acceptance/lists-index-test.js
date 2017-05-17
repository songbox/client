/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/lists-index';

moduleForAcceptance('Acceptance | lists index', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('sidebar should enable removal of lists', async function (assert) {
  assert.expect(3);

  server.create('list');

  await page.visit();
  await page.sidebar.actions.edit();

  assert.equal(currentURL(), '/a/lists?edit=true');
  assert.equal(page.sidebar.items().count, 1, '1 list in sidebar');

  await page.sidebar.items(0).buttons.remove();

  assert.equal(page.sidebar.items().count, 0, 'no list in sidebar');
});
