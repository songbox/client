import Ember from 'ember';

export default Ember.Component.extend({
  list: null,

  actions: {
    selectItem(item) {
      this.get('onSelect')(item);
    },
    reorderItems(itemModels, draggedModel) {
      this.get('onReorder')(itemModels, draggedModel);
    }
  }
});
