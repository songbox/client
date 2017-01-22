/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | list index');

test('visiting a nonexistent list', function(assert) {
  assert.expect(1);

  // seed db
  const user = server.create('user');
  const room = server.create('room', { user });
  user.update({ room });

  authenticateSession(this.application);
  visit('/a/lists/9999');

  andThen(function() {
    assert.equal(currentURL(), '/a/lists', 'redirects to lists overview');
  });
});
