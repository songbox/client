import Component from '@ember/component';

const ItemsComponent = Component.extend({
  models: null,
  group: null
});

ItemsComponent.reopenClass({
  positionalParams: ['models', 'group']
});

export default ItemsComponent;
