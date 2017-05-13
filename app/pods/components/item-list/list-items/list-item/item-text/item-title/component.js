import Ember from 'ember';

const TextComponent = Ember.Component.extend({
});

TextComponent.reopenClass({
  positionalParams: ['text']
});

export default TextComponent;
