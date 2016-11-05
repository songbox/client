import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

const {
  computed,
  inject: { service }
} = Ember;

const {
  api: { host, namespace }
} = ENV;

export default AjaxService.extend({
  session: service(),

  host,
  namespace,

  headers: computed('session.data', {
    get() {
      let headers = {
        'Accept': 'application/vnd.api+json'
      };
      this.get('session').authorize('authorizer:oauth2', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      return headers;
    }
  })
});
