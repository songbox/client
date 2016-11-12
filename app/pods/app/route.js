import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service },
  RSVP
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  pubsub: service(),
  session: service(),
  current: service(),

  beforeModel() {
    this._super();
    this.get('pubsub').connectUser();
  },

  model() {
    return this.get('current').load().then((user) => {
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
