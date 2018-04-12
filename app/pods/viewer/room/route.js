import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
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

      this.pubsub.connectViewer();
      this.pubsub.joinChannel(`room:${roomId}`, { type: 'Viewer' }).then((channel) => {
        channel.on('share', (resp) => {
          controller.set('model', resp);
        });
      });
    }
  }
});
