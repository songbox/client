import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  pubsub: service(),

  setupController(controller, model) {
    this._super(...arguments);

    this.controllerFor('songs').setProperties({ selected: model });

    // share song
    const channel = this.controllerFor('app').get('model.channel');
    const song = model.getProperties('title', 'text');
    if (channel) {
      channel.push('share', song);
    }
  },

  resetController(controller, isExiting/*, transition*/) {
    if (isExiting) {
      this.controllerFor('songs').setProperties({ selected: null });
    }
  }
});
