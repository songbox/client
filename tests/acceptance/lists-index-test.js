import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/lists-index';

module('Acceptance | lists index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    seed();
    authenticateSession(this.application);
  });

  test('sidebar should show list infos', async function (assert) {
    assert.expect(3);

    const name = 'My new List';
    this.server.create('list', { name });

    await page.visit();

    assert.equal(page.sidebar.main.items.length, 1, '1 list in sidebar');
    assert.equal(page.sidebar.main.items.objectAt(0).text.title, name, 'shows list name');
    assert.equal(page.sidebar.main.items.objectAt(0).text.details, '0 songs', 'shows amount of songs');
  });

  test('sidebar should enable removal of lists', async function (assert) {
    assert.expect(4);

    this.server.create('list');

    await page.visit();
    await page.sidebar.main.actions.edit();

    assert.equal(currentURL(), '/a/lists?edit=true');
    assert.equal(page.sidebar.main.items.length, 1, '1 list in sidebar');

    await page.sidebar.main.items.objectAt(0).buttons.remove();

    assert.equal(page.sidebar.main.items.length, 0, 'no list in sidebar');
    assert.equal(currentURL(), '/a/lists?edit=true', 'stays at same page');
  });
});
