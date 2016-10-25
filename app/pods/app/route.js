import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  pubsub: service(),
  session: service(),

  setupController(controller, model) {
    this.get('pubsub').connectUser();
    const channel = this.get('pubsub').joinChannel("room:123", { type: 'User' });
    controller.setProperties({ model, channel });
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
