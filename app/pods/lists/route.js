import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('list');
  },

  actions: {
    remove(list) {
      return list.destroyRecord();
    }
  }
});
