import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
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
      this.flashMessages.danger('Item not found');
      this.transitionTo('list', model.list);
    }
  }
});
