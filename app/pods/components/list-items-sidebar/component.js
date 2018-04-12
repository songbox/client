import Component from '@ember/component';

export default Component.extend({
  list: null,

  actions: {
    selectItem(item, index) {
      this.onSelect(item, index);
    },
    removeItem(item) {
      this.onRemove(item);
    },
    reorderItems(itemModels, draggedModel) {
      this.onReorder(itemModels, draggedModel);
    }
  }
});
