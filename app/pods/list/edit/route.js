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
    remove(item) {
      item.destroyRecord();
    },
    reorder(itemModels, draggedModel) {
      const position = itemModels.indexOf(draggedModel);
      draggedModel.setProperties({ position })
      return draggedModel.save()
    },
    show(list) {
      this.transitionTo('list', list);
    }
  }
});
