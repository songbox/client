import Ember from 'ember';

const {
  inject: { service },
  RSVP
} = Ember;

export default Ember.Route.extend({
  flashMessages: service(),

  model({ position }) {
    const list = this.modelFor('list');
    const item = list.get('listItems').sortBy('rank').objectAt(position - 1);

    return RSVP.hash({
      list,
      item
    });
  },

  afterModel(model) {
    if (! model.item) {
      this.get('flashMessages').danger('Item not found');
      this.transitionTo('list', model.list);
    }
  }
});
