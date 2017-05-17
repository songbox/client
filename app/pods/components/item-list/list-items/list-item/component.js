import Ember from 'ember';
import SortableItemMixin from 'ember-sortable/mixins/sortable-item';

export default Ember.Component.extend(SortableItemMixin, {
  tagName: 'li'
});
