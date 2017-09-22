import Component from '@ember/component';
import { computed } from '@ember/object';
import parsers from 'songbox/utils/parsers';

export default Component.extend({
  song: null,

  showChords: true,
  showSectionHeaders: true,
  showMultiColumn: false,

  sections: computed('song.text', 'song.format', function () {
    const parser = parsers[this.get('song.format') || 'opensong'];
    return parser(this.get('song.text'));
  })
});
