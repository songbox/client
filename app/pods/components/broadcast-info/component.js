import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  pubsub: service(),
  current: service(),

  attributeBindings: ['pubsub.statusMessage:title'],
  classNameBindings: [
    'pubsub.isSuccess:success',
    'pubsub.isInfo:info',
    'pubsub.isDanger:danger'
  ]
});
