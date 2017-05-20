/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/list-index';

moduleForAcceptance('Acceptance | list index', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('should redirect to list overview if list not found', async function (assert) {
  assert.expect(1);

  await page.visit({ id: 9999 });

  assert.equal(currentURL(), '/a/lists', 'redirects to lists overview');
});

test('should show song items', async function (assert) {
  const list = server.create('list');
  const song = server.schema.songs.find(1);
  server.create('list-item', { list, song });

  await page.visit({ id: list.id });

  assert.equal(page.sidebar.items().count, 1, '1 item in sidebar');
  assert.equal(page.sidebar.items(0).text.title, song.title, 'shows song title');
  assert.equal(page.sidebar.items(0).text.details, song.author, 'shows song author');

  await page.sidebar.items(0).click()

  assert.equal(currentURL(), `/a/lists/${list.id}/1`, 'shows first list item');
});
