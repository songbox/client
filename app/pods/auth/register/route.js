import Ember from 'ember';
import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import UserValidation from 'songbox/validations/user';

const {
  Route,
  inject: { service },
  String: { camelize }
} = Ember;

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
