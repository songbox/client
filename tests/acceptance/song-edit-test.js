/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'songbox/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'songbox/tests/helpers/ember-simple-auth';
import seed from 'songbox/tests/helpers/seed-mirage-db';
import page from 'songbox/tests/pages/song-edit';

moduleForAcceptance('Acceptance | song edit');

test('editing a song', function(assert) {
  assert.expect(3);

  let { song } = seed();
  authenticateSession(this.application);

  page
    .visit({ id: song.id })
    .form
      .title('New Song')
      .text('Song Text')
      .save();

  andThen(function() {
    song = server.db.songs.find(song.id);
    assert.equal(song.title, 'New Song', 'changed title');
    assert.equal(song.text, 'Song Text', 'changed text');
    assert.equal(currentURL(), `/a/songs/${song.id}`, 'redirects to song');
  });
});
