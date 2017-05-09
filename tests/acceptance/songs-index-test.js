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

test('sidebar item should navigate to song', async function (assert) {
  assert.expect(1);

  await page.visit();
  await page.sidebar.items(0).click();

  assert.equal(currentURL(), '/a/songs/2');
});
