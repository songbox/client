import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import page from 'songbox/tests/pages/auth-register';

module('Acceptance | auth register', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('it shows server errors in form', async function (assert) {
    assert.expect(5);

    let errors = [
      { title:"can't be blank", source:{"pointer":"/data/attributes/email"}, detail:"Email can't be blank"},
      { title:"can't be blank", source:{"pointer":"/data/attributes/password"}, detail:"Password can't be blank"},
      { title:"can't be blank", source:{"pointer":"/data/attributes/password-confirmation"}, detail:"Password confirmation can't be blank"}
    ];
    server.post('/register', function () {
      assert.ok(true, 'posts to server');
      return { errors };
    }, 422);

    await page.visit();
    await page.form
            .submit();

    assert.equal(currentURL(), '/auth/register', 'stays on registration page');
    assert.ok(page.form.emailHasError, 'shows error for email');
    assert.ok(page.form.passwordHasError, 'shows error for password');
    assert.ok(page.form.passwordConfirmationHasError, 'shows error for password confirmation');
  });
});
