import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import config from '../config/environment';

export default OAuth2PasswordGrantAuthenticator.extend({
  serverTokenEndpoint: `${config.api.host}/${config.api.namespace}/token`
});
