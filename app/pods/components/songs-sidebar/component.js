import Ember from 'ember';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  songs: [],

  searchTerm: '',
  filteredSongs: computed('songs.[]', 'searchTerm', function () {
    const term = this.get('searchTerm');

    if (isEmpty(term)) {
      return this.get('songs');
    }

    const regexp = new RegExp(term, 'i');
    return this.get('songs').filter((song) => {
      return regexp.test(song.get('title'));
    });
  }),

  actions: {
    clearSearch() {
      this.set('searchTerm', '');
    }
  }
});
