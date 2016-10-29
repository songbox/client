import Ember from 'ember';
import parsers from 'songbox/utils/parsers';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  song: null,

  sections: computed('song.text', 'song.format', function () {
    const parser = parsers[this.get('song.format') || 'opensong'];
    return parser(this.get('song.text'));
  })
});
