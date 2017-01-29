import Ember from 'ember';
import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import UserValidation from 'songbox/validations/user';

const {
  Route,
  inject: { service }
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
    doRegister(user) {
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
