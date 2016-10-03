import Ember from 'ember';
import parsers from 'songbox/utils/parsers';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  song: null,

  sections: computed('song.text', 'song.textFormat', function () {
    const parser = parsers[this.get('song.textFormat')];
    return parser(this.get('song.text'));
  })
});
