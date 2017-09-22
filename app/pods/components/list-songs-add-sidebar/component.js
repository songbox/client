import Component from '@ember/component';

export default Component.extend({
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
