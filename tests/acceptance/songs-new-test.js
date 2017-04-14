/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/songs-new';

moduleForAcceptance('Acceptance | songs new');

test('creating a song', function (assert) {
  assert.expect(3);

  seed();
  authenticateSession(this.application);

  page
    .visit()
    .form
      .title('New Song')
      .text('Song Text')
      .submit();

  andThen(function() {
    let song = server.db.songs.find(3);
    assert.equal(song.title, 'New Song', 'changed title');
    assert.equal(song.text, 'Song Text', 'changed text');
    assert.equal(currentURL(), '/a/songs', 'redirects to song list');
  });
});

test('shows validation error and prevents creation', function (assert) {
  assert.expect(2);

  seed();
  authenticateSession(this.application);

  page
    .visit()
    .form
      .text('Song Text') // TODO: remove
      .submit();

  andThen(() => {
    assert.equal(currentURL(), '/a/songs/new', 'stays at page');
    assert.ok(page.form.titleHasError, 'shows error for title');
  });
});
