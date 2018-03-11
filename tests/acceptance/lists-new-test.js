import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/lists-new';

module('Acceptance | lists new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    seed();
    authenticateSession(this.application);
  });

  test('creating a list', async function (assert) {
    assert.expect(2);

    await page.visit();
    await page.form
            .name('New List')
            .submit();

    let list = this.server.db.lists.find(1);
    assert.equal(currentURL(), '/a/lists', 'redirects to lists');
    assert.equal(list.name, 'New List', 'changed title');
  });
});
