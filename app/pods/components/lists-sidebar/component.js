import Component from '@ember/component';

export default Component.extend({
  lists: null,

  actions: {
    selectList(list) {
      this.get('onSelect')(list);
    },
    removeList(list) {
      this.get('onRemove')(list);
    }
  }
});
