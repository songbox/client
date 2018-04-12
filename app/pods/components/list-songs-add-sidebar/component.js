import Component from '@ember/component';

export default Component.extend({
  list: null,
  songs: null,

  actions: {
    addSong(song) {
      this.onAdd(song);
    },
    selectSong(song) {
      this.onSelect(song);
    }
  }
});
