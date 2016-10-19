import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.api.host,
  namespace: ENV.api.namespace,
  authorizer: 'authorizer:oauth2'
});
