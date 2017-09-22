import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  pubsub: service(),
  current: service(),

  attributeBindings: ['pubsub.statusMessage:title'],
  classNameBindings: [
    'pubsub.isSuccess:success',
    'pubsub.isInfo:info',
    'pubsub.isDanger:danger'
  ]
});
