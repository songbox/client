import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  actions: {
    authenticate() {
      this.get('session').authenticate('authenticator:songbox');
    }
  }
});
