import Ember from 'ember';

const ItemsComponent = Ember.Component.extend({
  tagName: 'ul'
});

ItemsComponent.reopenClass({
  positionalParams: ['items']
});

export default ItemsComponent;
