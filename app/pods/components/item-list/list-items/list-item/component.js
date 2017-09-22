import Component from '@ember/component';
import { computed } from '@ember/object';
import SortableItemMixin from 'ember-sortable/mixins/sortable-item';

export default Component.extend(SortableItemMixin, {
  tagName: 'li',

  classNameBindings: ['isSelected:active'],

  isSelected: computed('model.id', 'selected.id', function () {
    return this.get('model.id') === this.get('selected.id');
  })
});
