import Ember from 'ember';

export default Ember.Component.extend({
  list: null,
  songs: [],

  actions: {
    selectSong(song) {
      this.get('onSelect')(song);
    }
  }
});
