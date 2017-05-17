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

test('sidebar should show list infos', async function (assert) {
  assert.expect(3);

  const name = 'My new List';
  server.create('list', { name });

  await page.visit();

  assert.equal(page.sidebar.items().count, 1, '1 list in sidebar');
  assert.equal(page.sidebar.items(0).text.title, name, 'shows list name');
  assert.equal(page.sidebar.items(0).text.details, '0 songs', 'shows amount of songs');
});

test('sidebar should enable removal of lists', async function (assert) {
  assert.expect(4);

  server.create('list');

  await page.visit();
  await page.sidebar.actions.edit();

  assert.equal(currentURL(), '/a/lists?edit=true');
  assert.equal(page.sidebar.items().count, 1, '1 list in sidebar');

  await page.sidebar.items(0).buttons.remove();

  assert.equal(page.sidebar.items().count, 0, 'no list in sidebar');
  assert.equal(currentURL(), '/a/lists?edit=true', 'stays at same page');
});
