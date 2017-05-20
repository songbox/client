import Ember from 'ember';

export default Ember.Component.extend({
  list: null,
  songs: [],

  actions: {
    addSong(song) {
      this.get('onAdd')(song);
    },
    selectSong(song) {
      this.get('onSelect')(song);
    }
  }
});
