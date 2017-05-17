import Ember from 'ember';

export default Ember.Component.extend({
  songs: [],

  actions: {
    removeSong(song) {
      this.get('onRemove')(song);
    }
  }
});
