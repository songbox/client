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

  text: attr('string'),
  textFormat: attr('string'),

  // relationships
  list: belongsTo('list')
});
