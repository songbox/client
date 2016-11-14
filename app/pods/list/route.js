import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    reorder(itemModels, draggedModel) {
      const position = itemModels.indexOf(draggedModel);
      draggedModel.setProperties({ position });
      return draggedModel.save();
    }
  }
});
