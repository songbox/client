import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/list-index';

module('Acceptance | list index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    seed();
    authenticateSession(this.application);
  });

  test('should redirect to list overview if list not found', async function (assert) {
    assert.expect(1);

    await page.visit({ id: 9999 });

    assert.equal(currentURL(), '/a/lists', 'redirects to lists overview');
  });

  test('should show song items', async function (assert) {
    assert.expect(4);

    const list = this.server.create('list');
    const song = this.server.schema.songs.find(1);
    this.server.create('list-item', { list, song });

    await page.visit({ id: list.id });

    assert.equal(page.sidebar.main.items.lenth, 1, '1 item in sidebar');
    assert.equal(page.sidebar.main.items.objectAt(0).text.title, song.title, 'shows song title');
    assert.equal(page.sidebar.main.items.objectAt(0).text.details, song.author, 'shows song author');

    await page.sidebar.main.items.objectAt(0).click();

    assert.equal(currentURL(), `/a/lists/${list.id}/1`, 'shows first list item');
  });

  test('sidebar item should navigate to song and select it', async function (assert) {
    assert.expect(6);

    const list = this.server.create('list');
    const song = this.server.schema.songs.find(1);
    this.server.create('list-item', { list, song });

    await page.visit({ id: list.id });

    assert.equal(page.sidebar.main.items.length, 1, 'has 1 song in list');
    assert.notOk(page.sidebar.main.items.objectAt(0).isSelected, 'song is not selected');

    await page.sidebar.main.items.objectAt(0).click();

    assert.equal(currentURL(), `/a/lists/${list.id}/1`);
    assert.ok(page.sidebar.main.items.objectAt(0).isSelected, 'song is selected');

    await page.visit({ id: list.id });

    assert.equal(currentURL(), `/a/lists/${list.id}`);
    assert.notOk(page.sidebar.main.items.objectAt(0).isSelected, 'song is not selected');
  });

  test('should allow adding songs', async function (assert) {
    assert.expect(7);

    const list = this.server.create('list');
    const song = this.server.schema.songs.find(1);

    await page.visit({ id: list.id });

    assert.equal(page.sidebar.main.items.length, 0, 'has 0 items in sidebar');

    await page.sidebar.main.actions.add();

    assert.equal(page.sidebar.main.items.length, this.server.db.songs.length, 'shows all songs');
    assert.equal(page.sidebar.main.items.objectAt(1).text.title, song.title, 'shows song title');
    assert.equal(page.sidebar.main.items.objectAt(1).text.details, `${song.author} - 0`, 'shows song author with song count');

    await page.sidebar.main.items.objectAt(1).buttons.add();

    assert.equal(page.sidebar.main.items.objectAt(1).text.details, `${song.author} - 1`, 'shows song author with song count');

    await page.sidebar.main.actions.add();

    assert.equal(currentURL(), `/a/lists/${list.id}`, 'shows list');
    assert.equal(page.sidebar.main.items.length, 1, 'has 1 item in sidebar');
  });

  test('should allow deleting songs', async function (assert) {
    assert.expect(4);

    const list = this.server.create('list');
    const song = this.server.schema.songs.find(1);
    this.server.create('list-item', { list, song });

    await page.visit({ id: list.id });
    await page.sidebar.main.actions.edit();

    assert.equal(page.sidebar.main.items.length, 1, 'has 1 item in sidebar');
    assert.equal(page.sidebar.main.items.objectAt(0).text.title, song.title, 'shows song title');
    assert.equal(page.sidebar.main.items.objectAt(0).text.details, song.author, 'shows song author');

    await page.sidebar.main.items.objectAt(0).buttons.remove();

    assert.equal(page.sidebar.main.items.length, 0, 'has 0 items in sidebar');
  });
});
