import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  items: null,
  searchTerm: '',

  filtered: computed('items.[]', 'searchTerm', function () {
    const term = this.searchTerm;
    const attr = this.attr;

    if (isEmpty(term)) {
      return this.items;
    }

    const regexp = new RegExp(term, 'i');
    return this.items.filter((item) => {
      return regexp.test(item.get(attr));
    });
  }),

  actions: {
    clearSearch() {
      this.set('searchTerm', '');
    }
  }
});
