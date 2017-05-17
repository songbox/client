import Ember from 'ember';

export default Ember.Component.extend({
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
