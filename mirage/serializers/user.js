import BaseSerializer from './application';

export default BaseSerializer.extend({
  include: ['room'] // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
});
