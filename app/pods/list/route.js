import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  flashMessages: service(),

  model(params) {
    return this.store.find('list', params.list_id).catch((/*err*/) => {
      this.get('flashMessages').warning(`Could not retrieve List with ID ${params.list_id}`);
    });
  },
  afterModel(model) {
    if (! model) {
      this.transitionTo('lists');
    }
  },
  actions: {
    select(list, item, index) {
      this.transitionTo('list.item', list, index + 1);
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
    addSong(list, song) {
      const item = this.store.createRecord('list-item', {
        list,
        song
      });
      return item.save();
    }
  }
});
