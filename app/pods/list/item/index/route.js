import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  pubsub: service(),

  setupController(controller, model) {
    this._super(...arguments);

    this.controllerFor('list').setProperties({ selected: model.item });

    // share song
    const channel = this.controllerFor('app').get('model.channel');
    const song = model.item.get('song');
    if (channel) {
      channel.push('share', song.getProperties('title', 'text'));
    }
  },

  resetController(controller, isExiting/*, transition*/) {
    if (isExiting) {
      this.controllerFor('list').setProperties({ selected: null });
    }
  }
});
