import Ember from 'ember';

export function hostUrl(/*params, hash*/) {
  if (window && window.location) {
    return window.location.origin;
  } else {
    return "";
  }
}

export default Ember.Helper.helper(hostUrl);
