import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('list');
  },

  actions: {
    select(list) {
      return this.transitionTo('list', list);
    },
    remove(list) {
      return list.destroyRecord();
    }
  }
});
