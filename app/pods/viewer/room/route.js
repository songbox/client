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
    if (typeof(FastBoot) === "undefined") {
      const pathElems = window.location.pathname.split('/');
      const roomId = pathElems[pathElems.length -1];

      this.get('pubsub').connectViewer();
      this.get('pubsub').joinChannel(`room:${roomId}`, { type: 'Viewer' }).then((channel) => {
        channel.on('share', (resp) => {
          controller.set('model', resp);
        });
      });
    }
  }
});
