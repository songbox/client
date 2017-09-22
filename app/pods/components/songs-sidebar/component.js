import Component from '@ember/component';

export default Component.extend({
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
