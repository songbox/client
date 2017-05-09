import Ember from 'ember';

const {
  computed,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  items: [],

  searchTerm: '',
  filtered: computed('items.[]', 'searchTerm', function () {
    const term = this.get('searchTerm');
    const attr = this.get('attr');

    if (isEmpty(term)) {
      return this.get('items');
    }

    const regexp = new RegExp(term, 'i');
    return this.get('items').filter((item) => {
      return regexp.test(item.get(attr));
    });
  }),

  actions: {
    clearSearch() {
      this.set('searchTerm', '');
    }
  }
});
