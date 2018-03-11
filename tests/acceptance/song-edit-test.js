import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/song-edit';

module('Acceptance | song edit', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('editing a song', async function (assert) {
    assert.expect(3);

    let { song } = seed();
    authenticateSession(this.application);

    await page.visit({ id: song.id });
    await page.form
            .title('New Song')
            .text('Song Text')
            .submit();

    song = this.server.db.songs.find(song.id);
    assert.equal(song.title, 'New Song', 'changed title');
    assert.equal(song.text, 'Song Text', 'changed text');
    assert.equal(currentURL(), `/a/songs/${song.id}`, 'redirects to song');
  });

  test('shows validation error', async function (assert) {
    assert.expect(1);

    let { song } = seed();
    authenticateSession(this.application);

    await page.visit({ id: song.id })
    await page.form
            .title('');

    assert.ok(page.form.titleHasError, 'shows error for title');
  });
});
