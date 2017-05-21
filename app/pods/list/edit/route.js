import Ember from 'ember';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import DirtyChangeset from 'songbox/mixins/routes/dirty-changeset';
import ListValidation from 'songbox/validations/list';

export default Ember.Route.extend(ModelChangeset, DirtyChangeset, {
  validator: ListValidation,

  setupController(/* controller, model*/) {
    this._super(...arguments)

    this.controllerFor('list').setProperties({ editMode: true });
  },

  resetController(controller, isExiting/*, transition*/) {
    if (isExiting) {
      this.controllerFor('list').setProperties({ editMode: false });
    }
  },

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
