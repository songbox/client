import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  flashMessages: service(),

  model({ position }) {
    const listItems = this.modelFor('list').get('listItems');
    return listItems.sortBy('rank').objectAt(position - 1);
  },

  afterModel(model) {
    if (! model) {
      this.get('flashMessages').danger('Item not found');
      this.transitionTo('list');
    }
  }
});
