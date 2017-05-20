import Ember from 'ember';

export default Ember.Component.extend({
  list: null,

  actions: {
    selectItem(item, index) {
      this.get('onSelect')(item, index);
    }
  }
});
