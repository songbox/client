/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/songs-new';

moduleForAcceptance('Acceptance | songs new', {
  beforeEach() {
    seed();
    authenticateSession(this.application);
  }
});

test('creating a song', async function (assert) {
  assert.expect(3);

  await page.visit();
  await page.form
          .title('New Song')
          .text('Song Text')
          .submit();

  let song = server.db.songs.find(3);
  assert.equal(song.title, 'New Song', 'changed title');
  assert.equal(song.text, 'Song Text', 'changed text');
  assert.equal(currentURL(), `/a/songs/${song.id}`, 'redirects to new song');
});

test('shows validation error and prevents creation', async function (assert) {
  assert.expect(2);

  await page.visit();
  await page.form
          .text('Song Text') // to make 'save' button active
          .submit();

  assert.equal(currentURL(), '/a/songs/new', 'stays at page');
  assert.ok(page.form.titleHasError, 'shows error for title');
});

test('cancel form', async function (assert) {
  assert.expect(1);

  await page.visit();
  await page.form
          .cancel();

  assert.equal(currentURL(), '/a/songs', 'redirects to song list');
});
