import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),

  room: belongsTo('room', { async: false })
});
