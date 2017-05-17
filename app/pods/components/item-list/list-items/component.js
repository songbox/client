import Ember from 'ember';

const ItemsComponent = Ember.Component.extend({
  tagName: 'ul',

  models: [],
  group: null
});

ItemsComponent.reopenClass({
  positionalParams: ['models', 'group']
});

export default ItemsComponent;
