import Component from '@ember/component';

export default Component.extend({
  songs: null,

  actions: {
    selectSong(song) {
      this.onSelect(song);
    },
    removeSong(song) {
      this.onRemove(song);
    }
  }
});
