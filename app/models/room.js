import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  uid: attr('string'),
  user: belongsTo('user')
});
