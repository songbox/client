import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
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

      let { access_token } = this.get('session.data.authenticated');
      if (isPresent(access_token)) {
        headers['Authorization'] = `Bearer ${access_token}`;
      }

      return headers;
    }
  })
});
