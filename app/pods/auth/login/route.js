import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import UserValidation from 'songbox/validations/user-login';

export default Route.extend(ModelChangeset, {
  i18n: service(),
  session: service(),
  flashMessages: service(),

  validator: UserValidation,

  model() {
    return {
      modelName: 'user'
    };
  },

  actions: {
    doLogin(changeset) {
      return changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          return this.session.authenticate(
            'authenticator:songbox',
            changeset.get('email'),
            changeset.get('password')
          ).then(() => {
            const message = this.i18n.t('auth.login.flash-200');
            this.flashMessages.success(message);
          }).catch((response) => {
            const { errors } = response;

            if (errors.mapBy('code').includes(401)) {
              const message = this.i18n.t('auth.login.flash-401');
              this.flashMessages.danger(message);
            } else {
              const message = this.i18n.t('auth.login.flash-500');
              this.flashMessages.danger(message);
            }
          });
        }
      });
    }
  }
});
