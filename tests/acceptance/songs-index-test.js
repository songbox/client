import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/songs-index';

moduleForAcceptance('Acceptance | songs index', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('should have a sidebar with items', async function (assert) {
  assert.expect(2);

  await page.visit();

  assert.equal(page.sidebar.header, 'Songs');
  assert.equal(page.sidebar.items().count, 2);
});

test('sidebar item should navigate to song and select it', async function (assert) {
  assert.expect(6);

  await page.visit();

  assert.equal(page.sidebar.items().count, 2, 'has 2 songs in list');
  assert.notOk(page.sidebar.items(0).isSelected, 'song is not selected');

  await page.sidebar.items(0).click();

  assert.equal(currentURL(), '/a/songs/2');
  assert.ok(page.sidebar.items(0).isSelected, 'song is selected');

  await page.visit();

  assert.equal(currentURL(), '/a/songs');
  assert.notOk(page.sidebar.items(0).isSelected, 'song is not selected');
});

test('sidebar should enable removal of songs', async function (assert) {
  assert.expect(4);

  await page.visit();
  await page.sidebar.actions.edit();

  assert.equal(currentURL(), '/a/songs?edit=true');
  assert.equal(page.sidebar.items().count, 2, '2 songs in the list');

  await page.sidebar.items(0).buttons.remove();

  assert.equal(page.sidebar.items().count, 1, 'only 1 song in the list');
  assert.equal(currentURL(), '/a/songs?edit=true', 'stays on same page');
});
