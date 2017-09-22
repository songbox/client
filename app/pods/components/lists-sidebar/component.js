import Component from '@ember/component';

export default Component.extend({
  lists: [],

  actions: {
    selectList(list) {
      this.get('onSelect')(list);
    },
    removeList(list) {
      this.get('onRemove')(list);
    }
  }
});
