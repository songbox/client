/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | login');

test('invalid authtoken', function(assert) {
  assert.expect(1);

  // seed db
  const user = server.create('user');
  const room = server.create('room', { user });
  user.update({ room });

  server.get('/user/current', { errors: ['There was an error'] }, 401);

  authenticateSession(this.application);
  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/auth/login', 'redirects to login page');
  });
});
