import OAuth2PasswordGrant from './oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${config.api.host}/${config.api.namespace}/token`
});
