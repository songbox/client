import Ember from 'ember';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import ListValidation from 'songbox/validations/list';

export default Ember.Route.extend(ModelChangeset, {
  validator: ListValidation,

  model() {
    return {
      modelName: 'list' // used in ember-form-for
    };
  },

  actions: {
    save(changeset) {
      return changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          const list = this.store.createRecord('list', changeset.get('change'));
          list.save().then(() => {
            this.transitionTo('lists');
          });
        }
      });
    }
  }
});
