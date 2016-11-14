import Ember from 'ember';

const {
  run
} = Ember;

export default Ember.Route.extend({
  actions: {
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
    }
  }
});
