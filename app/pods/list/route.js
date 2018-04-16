import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import DirtyChangeset from 'songbox/mixins/routes/dirty-changeset';
import ListValidation from 'songbox/validations/list';

export default Route.extend(ModelChangeset, DirtyChangeset, {
  flashMessages: service(),

  validator: ListValidation,

  model(params) {
    return this.store.find('list', params.list_id).catch((/*err*/) => {
      this.flashMessages.warning(`Could not retrieve List with ID ${params.list_id}`);
    });
  },
  afterModel(model) {
    if (! model) {
      this.transitionTo('lists');
    }
  },
  actions: {
    save(changeset) {
      changeset.save().then((list) => {
        this.transitionTo('list', list);
      });
    },
    select(list, item, index) {
      this.transitionTo('list.item', list, index + 1);
    },
    show(list) {
      this.transitionTo('list', list);
    },
    remove(item) {
      //if (window.confirm('Really?')) {
      item.destroyRecord();
      //}
    },
    reorder(itemModels, draggedModel) {
      const currentItem = this.modelFor('list.item');
      const position = itemModels.indexOf(draggedModel);
      draggedModel.setProperties({ position })
      return draggedModel.save().then(() => {
        if (currentItem) {
          const currentPos = itemModels.indexOf(currentItem);
          return this.transitionTo('list.item', currentPos + 1);
        }
      });
    },
    add(list, song) {
      const item = this.store.createRecord('list-item', {
        list,
        song
      });
      return item.save();
    }
  }
});
