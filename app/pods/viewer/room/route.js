import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  pubsub: service(),

  model() {
    return {
      title: 'Please wait...',
      format: 'opensong',
      text: ''
    }
  },

  setupController(controller/*, model*/) {
    this.get('pubsub').connectViewer();
    this.get('pubsub')
      .joinChannel("room:123", { type: 'Viewer' })
      .on('share', (resp) => {
        controller.set('model', resp);
      });
  }
});
