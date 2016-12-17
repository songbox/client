import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  computed,
  inject: { service },
  RSVP
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  pubsub: service(),
  session: service(),
  current: service(),

  authenticationRoute: computed(function() {
    return 'auth.login';
  }),

  model() {
    return this.get('current').load().then((user) => {
      this.get('pubsub').connectUser();
      const channelName = `room:${user.get('room.uid')}`;
      const channel = this.get('pubsub').joinChannel(channelName);
      return RSVP.hash({ user, channel });
    });
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
