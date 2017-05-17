import Ember from 'ember';

export default Ember.Component.extend({
  songs: [],

  actions: {
    selectSong(song) {
      this.get('onSelect')(song);
    },
    removeSong(song) {
      this.get('onRemove')(song);
    }
  }
});
