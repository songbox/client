/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';

moduleForAcceptance('Acceptance | login');

test('invalid authtoken', function(assert) {
  assert.expect(1);

  seed();
  authenticateSession(this.application);
  server.get('/user/current', { errors: ['There was an error'] }, 401);

  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/auth/login', 'redirects to login page');
  });
});
