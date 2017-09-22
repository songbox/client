import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import UserValidation from 'songbox/validations/user-login';

export default Route.extend(ModelChangeset, {
  validator: UserValidation,

  i18n: service(),
  session: service(),
  flashMessages: service(),

  model() {
    return {
      modelName: 'user'
    };
  },

  actions: {
    doLogin(changeset) {
      return changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          return this.get('session').authenticate(
            'authenticator:songbox',
            changeset.get('email'),
            changeset.get('password')
          ).then(() => {
            const message = this.get('i18n').t('auth.login.flash-200');
            this.get('flashMessages').success(message);
          }).catch((response) => {
            const { errors } = response;

            if (errors.mapBy('code').includes(401)) {
              const message = this.get('i18n').t('auth.login.flash-401');
              this.get('flashMessages').danger(message);
            } else {
              const message = this.get('i18n').t('auth.login.flash-500');
              this.get('flashMessages').danger(message);
            }
          });
        }
      });
    }
  }
});
