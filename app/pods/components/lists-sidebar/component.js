import Ember from 'ember';

export default Ember.Component.extend({
  lists: [],

  actions: {
    removeList(list) {
      this.get('onRemove')(list);
    }
  }
});
