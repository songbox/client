import DS from 'ember-data';

const {
  attr
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  author: attr('string'),
  key: attr('string'),
  textFormat: attr('string'),
  text: attr('string')
});
