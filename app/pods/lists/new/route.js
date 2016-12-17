import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('list');
  },

  actions: {
    save(list) {
      list.save().then(() => {
        this.transitionTo('lists');
      });
    }
  }
});
