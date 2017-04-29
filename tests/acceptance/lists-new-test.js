/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/lists-new';

moduleForAcceptance('Acceptance | lists new', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('creating a list', function (assert) {
  assert.expect(2);

  page
    .visit()
    .form
      .name('New List')
      .submit();

  andThen(function() {
    let list = server.db.lists.find(1);
    assert.equal(currentURL(), '/a/lists', 'redirects to lists');
    assert.equal(list.name, 'New List', 'changed title');
  });
});
