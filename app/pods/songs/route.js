import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('song');
  },

  actions: {
    select(song) {
      return this.transitionTo('song', song);
    },
    remove(song) {
      return song.destroyRecord();
    }
  }
});
