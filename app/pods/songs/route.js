import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('song');
  },

  actions: {
    remove(song) {
      return song.destroyRecord();
    }
  }
});
