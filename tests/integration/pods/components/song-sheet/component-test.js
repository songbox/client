import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | song sheet', function(hooks) {
  setupRenderingTest(hooks);

  test('it should render lyrics', async function(assert) {
    this.set('song', {
      format: 'opensong',
        text: '[V]\n Dank sei Dir'
    });

    await render(hbs`{{song-sheet song=song}}`);

    assert.equal(find('*').textContent.replace(/\s+/g,' ').trim(), 'Verse Dank sei Dir');
  });
});