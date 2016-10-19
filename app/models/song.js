import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({

  // attributes
  title: attr('string'),
  author: attr('string'),
  key: attr('string'),
  tempo: attr('number'),
  time: attr('string'),

  text: attr('string'),
  format: attr('string'),

  license: attr('string'),
  ccli: attr('number'),

  // relationships
  list: belongsTo('list')
});
