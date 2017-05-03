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

test('should have a sidebar with items', function (assert) {
  assert.expect(2);

  page.visit();

  andThen(() => {
    assert.equal(page.sidebar.header, 'Songs');
    assert.equal(page.sidebar.items().count, 2);
  });
});

test('sidebar item should navigate to song', function (assert) {
  assert.expect(1);

  page.visit();
  page.sidebar.items(0).click();

  andThen(() => {
    assert.equal(currentURL(), '/a/songs/2');
  });
});
