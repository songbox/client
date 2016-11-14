import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  rank: attr('number'), // order column
  position: attr('number'), // set to specify position

  song: belongsTo('song'),
  list: belongsTo('list')
});
