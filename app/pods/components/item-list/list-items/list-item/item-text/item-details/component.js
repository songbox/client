import Component from '@ember/component';

const TextComponent = Component.extend({
});

TextComponent.reopenClass({
  positionalParams: ['text']
});

export default TextComponent;
