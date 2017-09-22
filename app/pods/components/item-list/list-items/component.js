import Component from '@ember/component';

const ItemsComponent = Component.extend({
  models: [],
  group: null
});

ItemsComponent.reopenClass({
  positionalParams: ['models', 'group']
});

export default ItemsComponent;
