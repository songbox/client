import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/songs-index';

module('Acceptance | songs index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    seed();
    authenticateSession(this.application);
  });

  test('should have a sidebar with items', async function (assert) {
    assert.expect(2);

    await page.visit();

    assert.equal(page.sidebar.main.header, 'Songs');
    assert.equal(page.sidebar.main.items.length, 2);
  });

  test('sidebar item should navigate to song and select it', async function (assert) {
    assert.expect(6);

    await page.visit();

    assert.equal(page.sidebar.main.items.length, 2, 'has 2 songs in list');
    assert.notOk(page.sidebar.main.items.objectAt(0).isSelected, 'song is not selected');

    await page.sidebar.main.items.objectAt(0).click();

    assert.equal(currentURL(), '/a/songs/2');
    assert.ok(page.sidebar.main.items.objectAt(0).isSelected, 'song is selected');

    await page.visit();

    assert.equal(currentURL(), '/a/songs');
    assert.notOk(page.sidebar.main.items.objectAt(0).isSelected, 'song is not selected');
  });

  test('sidebar should enable removal of songs', async function (assert) {
    assert.expect(4);

    await page.visit();
    await page.sidebar.main.actions.edit();

    assert.equal(currentURL(), '/a/songs?edit=true');
    assert.equal(page.sidebar.main.items.length, 2, '2 songs in the list');

    await page.sidebar.main.items.objectAt(0).buttons.remove();

    assert.equal(page.sidebar.main.items.length, 1, 'only 1 song in the list');
    assert.equal(currentURL(), '/a/songs?edit=true', 'stays on same page');
  });
});
