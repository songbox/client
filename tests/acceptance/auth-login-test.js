/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/auth-login';

moduleForAcceptance('Acceptance | login');

test('login', function (assert) {
  assert.expect(1);

  seed();

  page
    .visit()
    .form
      .email('john@example.com')
      .password('mysecret')
      .login();

  andThen(() => {
    assert.equal(currentURL(), '/a/songs', 'redirects to songs page');
  });
});

test('invalid authtoken', function (assert) {
  assert.expect(1);

  seed();
  authenticateSession(this.application);
  server.get('/user/current', { errors: ['There was an error'] }, 401);

  visit('/');

  andThen(() => {
    assert.equal(currentURL(), '/auth/login', 'redirects to login page');
  });
});

