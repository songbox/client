import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { camelize } from '@ember/string';
import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import UserValidation from 'songbox/validations/user';

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
    doRegister(changeset) {
      const user = this.store.createRecord('user', changeset.get('change'));
      return user.save().then(() => {
        this.transitionTo('auth.login');
        this.get('flashMessages').success('Registered! Please login now');
      }).catch((resp) => {
        this.store.unloadRecord(user);
        resp.errors.forEach((error) => {
          let attribute = camelize(error.source.pointer.split('/')[3]);
          let message = error.detail;
          changeset.pushErrors(attribute, message);
        });
      });
    }
  }
});
