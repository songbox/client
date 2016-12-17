import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  pubsub: service(),

  setupController(controller, model) {
    controller.set('model', model);

    // share song
    const channel = this.controllerFor('app').get('model.channel');
    const song = model.item.get('song');
    channel.push('share', song.getProperties('title', 'text'));
  }
});
