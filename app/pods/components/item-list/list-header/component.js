import Component from '@ember/component';

const ListHeaderComponent = Component.extend({
  tagName: 'h1'
});

ListHeaderComponent.reopenClass({
  positionalParams: ['text']
});

export default ListHeaderComponent;
