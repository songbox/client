import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  flashMessages: service(),

  model() {
    return this.store.createRecord('user');
  },

  actions: {
    doRegister() {
      const user = this.get('controller.model');

      user.save().then(() => {
        this.transitionTo('auth.login');
        this.get('flashMessages').success('Registered! Please login now');
      }).catch((resp) => {
        const { errors } = resp;
        this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
      });
    }
  }
});
