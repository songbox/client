import Ember from 'ember';

export default Ember.Component.extend({
  list: null,

  actions: {
    reorderItems(itemModels, draggedModel) {
      this.get('onReorder')(itemModels, draggedModel);
    }
  }
});
