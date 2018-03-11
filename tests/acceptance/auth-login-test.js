import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/auth-login';

module('Acceptance | auth login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('login', async function (assert) {
    assert.expect(1);

    seed();

    await page.visit();
    await page.form
            .email('john@example.com')
            .password('mysecret')
            .submit();

    assert.equal(currentURL(), '/a/songs', 'redirects to songs page');
  });

  test('it shows errors without server request when form invalid', async function (assert) {
    assert.expect(3);

    seed();
    this.server.post('/token', function () {
      assert.notOk('should not post to the server');
    });

    await page.visit();
    await page.form
            .submit();

    assert.equal(currentURL(), '/auth/login', 'stay on login page');
    assert.ok(page.form.emailHasError, 'shows error for email');
    assert.ok(page.form.passwordHasError, 'shows error for password');
  });

  test('invalid authtoken', async function(assert) {
    assert.expect(1);

    seed();
    authenticateSession(this.application);
    this.server.get('/users/current', { errors: ['There was an error'] }, 401);

    await visit('/');

    assert.equal(currentURL(), '/auth/login', 'redirects to login page');
  });
});
