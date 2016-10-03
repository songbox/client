import Ember from 'ember';
import DS from 'ember-data';
import parseOpensong from '../utils/parse-opensong';

const {
  computed
} = Ember;

const {
  attr
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  author: attr('string'),
  key: attr('string'),
  text: attr('string'),

  sections: computed('text', function () {
    return parseOpensong(this.get('text'));
  })
});
