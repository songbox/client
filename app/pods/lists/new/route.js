import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('list');
  },

  actions: {
    save(song) {
      song.save().then(() => {
        this.transitionTo('lists');
      });
    }
  }
});
