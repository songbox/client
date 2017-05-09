import Ember from 'ember';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import DirtyChangeset from 'songbox/mixins/routes/dirty-changeset';
import ListValidation from 'songbox/validations/list';

export default Ember.Route.extend(ModelChangeset, DirtyChangeset, {
  validator: ListValidation,

  actions: {
    save(changeset) {
      changeset.save().then((list) => {
        this.transitionTo('list', list);
      });
    },
    show(list) {
      this.transitionTo('list', list);
    }
  }
});
