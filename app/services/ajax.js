import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

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
      this.session.authorize('authorizer:oauth2', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      return headers;
    }
  })
});
