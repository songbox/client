import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('song-sheet', 'Integration | Component | song sheet', {
  integration: true
});

test('it should render lyrics', function(assert) {
  this.set('song', {
    format: 'opensong',
      text: '[V]\n Dank sei Dir'
  });

  this.render(hbs`{{song-sheet song=song}}`);

  assert.equal(this.$().text().replace(/\s+/g,' ').trim(), 'Verse Dank sei Dir');
});
