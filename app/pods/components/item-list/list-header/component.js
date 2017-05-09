import Ember from 'ember';

const ListHeaderComponent = Ember.Component.extend({
  tagName: 'h1'
});

ListHeaderComponent.reopenClass({
  positionalParams: ['text']
});

export default ListHeaderComponent;
