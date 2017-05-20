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
  assert.expect(4);

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

test('should allow adding songs', async function (assert) {
  assert.expect(7);

  const list = server.create('list');
  const song = server.schema.songs.find(1);

  await page.visit({ id: list.id });

  assert.equal(page.sidebar.items().count, 0, 'has 0 items in sidebar');

  await page.sidebar.actions.add();

  assert.equal(page.sidebar.items().count, server.db.songs.length, 'shows all songs');
  assert.equal(page.sidebar.items(1).text.title, song.title, 'shows song title');
  assert.equal(page.sidebar.items(1).text.details, `${song.author} - 0`, 'shows song author with song count');

  await page.sidebar.items(1).buttons.add();

  assert.equal(page.sidebar.items(1).text.details, `${song.author} - 1`, 'shows song author with song count');

  await page.sidebar.actions.add();

  assert.equal(currentURL(), `/a/lists/${list.id}`, 'shows list');
  assert.equal(page.sidebar.items().count, 1, 'has 1 item in sidebar');
});

test('should allow deleting songs', async function (assert) {
  assert.expect(4);

  const list = server.create('list');
  const song = server.schema.songs.find(1);
  server.create('list-item', { list, song });

  await page.visit({ id: list.id });
  await page.sidebar.actions.edit();

  assert.equal(page.sidebar.items().count, 1, 'has 1 item in sidebar');
  assert.equal(page.sidebar.items(0).text.title, song.title, 'shows song title');
  assert.equal(page.sidebar.items(0).text.details, song.author, 'shows song author');

  await page.sidebar.items(0).buttons.remove();

  assert.equal(page.sidebar.items().count, 0, 'has 0 items in sidebar');
});

