import Ember from 'ember';
import SortableItemMixin from 'ember-sortable/mixins/sortable-item';

const {
  computed
} = Ember;

export default Ember.Component.extend(SortableItemMixin, {
  tagName: 'li',

  classNameBindings: ['isSelected:active'],

  isSelected: computed('model.id', 'selected.id', function () {
    return this.get('model.id') === this.get('selected.id');
  })
});
