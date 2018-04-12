import Component from '@ember/component';

export default Component.extend({
  lists: null,

  actions: {
    selectList(list) {
      this.onSelect(list);
    },
    removeList(list) {
      this.onRemove(list);
    }
  }
});
