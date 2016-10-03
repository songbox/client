import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  RSVP
} = Ember;

export default Base.extend({
  restore(/*data*/) {
    return RSVP.reject();
  },
  authenticate(/*options*/) {
    return RSVP.resolve();
  },
  invalidate(/*data*/) {
    return RSVP.resolve();
  }
});
