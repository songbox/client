import Ember from 'ember';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend({
  i18n: service(),
  session: service(),
  flashMessages: service(),

  model() {
    return {
      email: '',
      password: ''
    };
  },

  actions: {
    doLogin() {
      const user = this.get('controller.model');

      this.get('session').authenticate(
        'authenticator:songbox',
        user.email,
        user.password
      ).then(() => {
        const message = this.get('i18n').t('login.flash-200');
        this.get('flashMessages').success(message);
      }).catch((response) => {
        const { errors } = response;

        if (errors.mapBy('code').includes(401)) {
          const message = this.get('i18n').t('login.flash-401');
          this.get('flashMessages').danger(message);
        } else {
          const message = this.get('i18n').t('login.flash-500');
          this.get('flashMessages').danger(message);
        }
      });
    }
  }
});
