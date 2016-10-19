import Ember from 'ember';

const {
  Component,
  computed,
  makeArray
} = Ember;

export default Component.extend({
  classNames: ['input-field'],

  type: 'text',

  _errorMessages: computed('errors.[]', function() {
    return makeArray(this.get('errors')).join(', ');
  })
});
