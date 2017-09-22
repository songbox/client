import Route from '@ember/routing/route';

export default Route.extend({
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
