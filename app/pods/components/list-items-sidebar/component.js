import Component from '@ember/component';

export default Component.extend({
  list: null,

  actions: {
    selectItem(item, index) {
      this.get('onSelect')(item, index);
    },
    removeItem(item) {
      this.get('onRemove')(item);
    },
    reorderItems(itemModels, draggedModel) {
      this.get('onReorder')(itemModels, draggedModel);
    }
  }
});
