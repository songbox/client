import Ember from 'ember';
import SortableItemMixin from 'ember-sortable/mixins/sortable-item';
import layout from '../list-item/template';

export default Ember.LinkComponent.extend(SortableItemMixin, {
  layout,
  tagName: 'li'
});
