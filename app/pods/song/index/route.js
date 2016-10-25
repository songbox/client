import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  pubsub: service(),

  setupController(controller, model) {
    controller.set('model', model);

    // share song
    const channel = this.controllerFor('app').get('channel');
    const song = model.getProperties('title', 'text');
    channel.push('share', song);
  }
});
