/* global server */

import { skip, test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/songs-index';
import modal from 'songbox/tests/pages/modals/account';

moduleForAcceptance('Acceptance | account', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('should be opened from sidebar', async function (assert) {
  assert.expect(1);

  await page.visit();
  await page.sidebar.footer.openAccount();

  assert.ok(modal.isOpen);
});

test('should have form to change password', async function (assert) {
  assert.expect(2);

  await modal.open();
  await modal.form
    .password('mypassword')
    .passwordConfirmation('mypassword')
    .submit();

  assert.notOk(modal.isOpen, 'modal is closed');
  assert.equal(server.db.users[0].password, 'mypassword', 'database updated');

  // FIXME: clean saved form
  /*
  await modal.open();

  assert.equal(modal.form.passwordValue, '', 'field was reset');
  assert.equal(modal.form.passwordConfirmationValue, '', 'field was reset');
  */
});

test('should have cancel button in password form', async function (assert) {
  assert.expect(3);

  await modal.open();
  await modal.form
    .password('mypassword')
    .passwordConfirmation('mypassword')
    .cancel();

  assert.notOk(modal.isOpen, 'modal is closed');

  await modal.open();

  assert.equal(modal.form.passwordValue, '', 'field was reset');
  assert.equal(modal.form.passwordConfirmationValue, '', 'field was reset');
});

skip('should have a logout button', async function (assert) {
  assert.expect(1);

  await modal.open();
  await modal.logout();

  assert.equal(currentURL(), '/auth/login', 'show login page');
});

