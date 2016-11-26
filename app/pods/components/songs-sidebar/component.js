import Ember from 'ember';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  songs: [],

  searchTerm: '',
  filteredSongs: computed('songs.[]', 'searchTerm', function () {
    return this.get('songs').filter((song) => {
      const term = this.get('searchTerm');
      const songTitle = song.get('title');
      return isEmpty(term) || (new RegExp(term, 'i')).test(songTitle);
    });
  })
});
