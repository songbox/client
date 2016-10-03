import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  redirect() {
    this.transitionTo('songs');
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
