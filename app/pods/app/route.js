import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  ajax: service(),
  pubsub: service(),
  session: service(),

  model() {
    return this.get('ajax').request('/user/current').then(data => {
      this.store.pushPayload(data);
    });
  },

  setupController(controller, model) {
    const userId = this.store.peekAll('user').get('firstObject.id')

    this.get('pubsub').connectUser();
    this.get('pubsub').joinChannel(`room:${userId}`, { type: 'User' }).then((channel) => {
      controller.setProperties({ model, channel });
    }).catch(err => {
      console.log(err);
    });
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
